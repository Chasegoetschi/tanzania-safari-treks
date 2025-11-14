-- Drop the existing policy that's causing issues
DROP POLICY IF EXISTS "Users can view own bookings" ON public.bookings;

-- Create a new, simpler policy that uses JWT claims directly
CREATE POLICY "Users can view own bookings" ON public.bookings
FOR SELECT 
TO authenticated
USING (
  -- Allow if user_id matches (for bookings created by logged-in users)
  user_id = auth.uid() 
  OR 
  -- Allow if email matches the authenticated user's email (from JWT token)
  email = (auth.jwt() ->> 'email')
);