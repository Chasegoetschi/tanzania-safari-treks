-- Fix 1: Auto-link bookings when users sign up (matches by email)
CREATE OR REPLACE FUNCTION public.link_bookings_on_signup()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.bookings 
  SET user_id = NEW.id 
  WHERE email = NEW.email AND user_id IS NULL;
  RETURN NEW;
END;
$$;

-- Create trigger on auth.users to link bookings on signup
CREATE TRIGGER on_auth_user_created_link_bookings
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.link_bookings_on_signup();

-- Fix 2: Rate limiting function for contact submissions
CREATE OR REPLACE FUNCTION public.check_contact_rate_limit(check_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recent_count integer;
BEGIN
  SELECT COUNT(*) INTO recent_count
  FROM public.contact_submissions
  WHERE email = check_email
  AND created_at > NOW() - INTERVAL '1 hour';
  RETURN recent_count < 5;  -- Max 5 per hour per email
END;
$$;

-- Update contact form insert policy to include rate limiting
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;

CREATE POLICY "Anyone can submit contact form with rate limit"
ON public.contact_submissions
FOR INSERT
WITH CHECK (public.check_contact_rate_limit(email));