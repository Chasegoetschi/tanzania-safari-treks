-- Create tours table
CREATE TABLE IF NOT EXISTS public.tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT,
  duration_days INT,
  base_price NUMERIC(12,2),
  description TEXT,
  hero_image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create bookings table (separate from inquiries)
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_ref TEXT UNIQUE NOT NULL,
  tour_id UUID REFERENCES public.tours(id) ON DELETE SET NULL,
  tour_name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  group_size INT NOT NULL CHECK (group_size >= 1),
  start_date DATE NOT NULL,
  end_date DATE,
  special_requests TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tours (public read access)
CREATE POLICY "Anyone can view active tours"
ON public.tours
FOR SELECT
USING (is_active = true);

-- RLS Policies for bookings (anyone can insert, only authenticated can view all)
CREATE POLICY "Anyone can submit booking requests"
ON public.bookings
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Authenticated users can view all bookings"
ON public.bookings
FOR SELECT
USING (auth.role() = 'authenticated');

-- Create index for faster lookups
CREATE INDEX idx_bookings_ref ON public.bookings(booking_ref);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_tours_active ON public.tours(is_active);

-- Insert sample tours
INSERT INTO public.tours (name, location, duration_days, base_price, description) VALUES
('TASTE OF TANZANIA', 'Ngorongoro Crater', 3, 800, 'Experience the best of Tanzania in 3 days'),
('MID-RANGE WILDERNESS', 'Ngorongoro Crater', 4, 1000, 'Explore the crater wilderness'),
('MID-RANGE BEST OF TANZANIA', 'Serengeti National Park', 5, 2000, 'Complete Tanzania safari experience'),
('MID-RANGE TANZANIA HIGHLIGHTS', 'Serengeti National Park', 6, 3000, 'All the highlights of Tanzania'),
('CRATER RIM ADVENTURE', 'Serengeti National Park', 7, 3200, 'Adventure around the crater rim'),
('TANZANIA LUXURY ALL-INCLUSIVE', 'Serengeti National Park', 7, 4000, 'Premium luxury safari experience'),
('MOUNT KILIMANJARO - MACHAME ROUTE', 'Kilimanjaro', 7, 2200, 'Summit via the scenic Machame route'),
('MOUNT KILIMANJARO - LEMOSHO ROUTE', 'Kilimanjaro', 8, 2500, 'The most scenic route to the summit'),
('MOUNT KILIMANJARO - MARANGU ROUTE', 'Kilimanjaro', 5, 1800, 'Classic route with hut accommodation'),
('MOUNT MERU ADVENTURE', 'Arusha', 4, 1200, 'Perfect acclimatization trek'),
('SERENGETI EXPLORER', 'Serengeti', 5, 2500, 'Witness the Great Migration'),
('KILIMANJARO & SAFARI COMBO', 'Kilimanjaro & Parks', 10, 4800, 'Summit and safari combined'),
('ZANZIBAR BEACH & BUSH', 'Zanzibar & Parks', 7, 3200, 'Safari and beach relaxation');