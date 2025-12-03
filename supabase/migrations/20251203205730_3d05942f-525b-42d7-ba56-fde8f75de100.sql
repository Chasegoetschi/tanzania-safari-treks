-- Add admin DELETE policy for bookings (to manage spam/cancelled bookings)
CREATE POLICY "Admins can delete bookings"
ON public.bookings
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add INSERT policy for profiles (self-creation backup, trigger handles this primarily)
CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Add admin UPDATE and DELETE policies for contact_submissions
CREATE POLICY "Admins can update submissions"
ON public.contact_submissions
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete submissions"
ON public.contact_submissions
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add admin policies for tours table
CREATE POLICY "Admins can insert tours"
ON public.tours
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update tours"
ON public.tours
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete tours"
ON public.tours
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add admin policies for activities table
CREATE POLICY "Admins can insert activities"
ON public.activities
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update activities"
ON public.activities
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete activities"
ON public.activities
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add admin policies for locations table
CREATE POLICY "Admins can insert locations"
ON public.locations
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update locations"
ON public.locations
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete locations"
ON public.locations
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));