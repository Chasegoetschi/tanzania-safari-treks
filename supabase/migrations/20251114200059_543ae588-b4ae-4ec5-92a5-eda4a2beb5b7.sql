-- Create enum for user roles (if not exists)
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'user');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;

-- Policy for users to view their own roles
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to automatically assign user role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Assign default 'user' role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'user')
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN new;
END;
$$;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created_role ON auth.users;

-- Trigger to assign role on user signup
CREATE TRIGGER on_auth_user_created_role
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_role();

-- Update bookings table to link to auth users
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Update bookings RLS policies
DROP POLICY IF EXISTS "Anyone can submit booking requests" ON public.bookings;
DROP POLICY IF EXISTS "Authenticated users can view all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Users can view own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can view all bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can update bookings" ON public.bookings;

CREATE POLICY "Anyone can submit booking requests"
  ON public.bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view own bookings"
  ON public.bookings FOR SELECT
  USING (
    auth.uid() = user_id 
    OR email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

CREATE POLICY "Admins can view all bookings"
  ON public.bookings FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update bookings"
  ON public.bookings FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));