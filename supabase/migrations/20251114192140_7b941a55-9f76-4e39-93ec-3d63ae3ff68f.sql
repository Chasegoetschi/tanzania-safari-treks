-- Add content type columns to bookings table
ALTER TABLE bookings 
  ADD COLUMN IF NOT EXISTS content_type text,
  ADD COLUMN IF NOT EXISTS content_id uuid,
  ADD COLUMN IF NOT EXISTS content_name text;

-- Migrate existing bookings to use new content columns
UPDATE bookings 
SET 
  content_type = 'safari',
  content_id = tour_id,
  content_name = tour_name
WHERE content_type IS NULL;

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric(12,2),
  duration text,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on activities
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active activities
CREATE POLICY "Anyone can view active activities" 
ON activities 
FOR SELECT 
USING (is_active = true);

-- Create locations table
CREATE TABLE IF NOT EXISTS locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  region text,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on locations
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view active locations
CREATE POLICY "Anyone can view active locations" 
ON locations 
FOR SELECT 
USING (is_active = true);

-- Insert sample activities
INSERT INTO activities (name, description, duration, price) VALUES
  ('Hot Air Balloon Safari', 'Experience the Serengeti from above with a sunrise hot air balloon ride', '3-4 hours', 550.00),
  ('Cultural Village Tour', 'Visit local Maasai villages and experience authentic Tanzanian culture', '4-5 hours', 85.00),
  ('Walking Safari', 'Explore the bush on foot with experienced guides', '2-3 hours', 120.00),
  ('Night Game Drive', 'Discover nocturnal wildlife on an exciting night safari', '3 hours', 95.00);

-- Insert sample locations
INSERT INTO locations (name, description, region) VALUES
  ('Serengeti National Park', 'Witness the Great Migration and explore endless plains', 'Northern Circuit'),
  ('Ngorongoro Crater', 'Visit the world''s largest intact volcanic caldera', 'Northern Circuit'),
  ('Zanzibar Beach', 'Relax on pristine white sand beaches and turquoise waters', 'Zanzibar'),
  ('Mount Kilimanjaro', 'Trek to the roof of Africa', 'Northern Circuit');