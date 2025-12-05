-- Fix: Update INSERT policy to require authentication
-- Drop the permissive "Anyone can submit booking requests" policy
DROP POLICY IF EXISTS "Anyone can submit booking requests" ON public.bookings;

-- Create new policy requiring authentication and matching user_id
CREATE POLICY "Authenticated users can insert their own bookings"
ON public.bookings
FOR INSERT
WITH CHECK (
  auth.uid() IS NOT NULL
  AND user_id = auth.uid()
);