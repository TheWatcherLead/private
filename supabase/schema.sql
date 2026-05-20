-- Axis Concept — Supabase Schema
-- Run this in the Supabase SQL editor

-- Properties
CREATE TABLE properties (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text UNIQUE NOT NULL,
  title         text NOT NULL,
  description   text,
  type          text CHECK (type IN ('residential','commercial','warehouse')) NOT NULL,
  status        text CHECK (status IN ('active','sold','coming_soon')) NOT NULL DEFAULT 'active',
  location      text,
  city          text NOT NULL DEFAULT 'Bangalore',
  area_sqft     int,
  price_from    numeric,
  price_to      numeric,
  possession_date date,
  thumbnail_url text,
  gallery_urls  text[] DEFAULT '{}',
  amenities     text[] DEFAULT '{}',
  highlights    text[] DEFAULT '{}',
  rera_number   text,
  is_featured   boolean NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- Units
CREATE TABLE units (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id     uuid NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  unit_type       text NOT NULL,
  floor           int,
  area_sqft       int,
  price           numeric,
  status          text CHECK (status IN ('available','sold','reserved')) NOT NULL DEFAULT 'available',
  floor_plan_url  text,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- Projects (portfolio)
CREATE TABLE projects (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text UNIQUE NOT NULL,
  title           text NOT NULL,
  description     text,
  type            text CHECK (type IN ('residential','commercial','academic','warehouse')) NOT NULL,
  location        text,
  year_completed  int,
  area_sqft       int,
  gallery_urls    text[] DEFAULT '{}',
  highlights      text[] DEFAULT '{}',
  thumbnail_url   text,
  is_featured     boolean NOT NULL DEFAULT false,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- Enquiries
CREATE TABLE enquiries (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  email         text,
  phone         text NOT NULL,
  message       text,
  source_page   text,
  property_id   uuid REFERENCES properties(id) ON DELETE SET NULL,
  status        text CHECK (status IN ('new','contacted','qualified','closed')) NOT NULL DEFAULT 'new',
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- Team
CREATE TABLE team (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name            text NOT NULL,
  role            text,
  bio             text,
  photo_url       text,
  display_order   int NOT NULL DEFAULT 0,
  is_active       boolean NOT NULL DEFAULT true
);

-- Auto-update updated_at on properties
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Indexes
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_type ON properties(type);
CREATE INDEX idx_properties_is_featured ON properties(is_featured);
CREATE INDEX idx_units_property_id ON units(property_id);
CREATE INDEX idx_enquiries_status ON enquiries(status);
CREATE INDEX idx_enquiries_created_at ON enquiries(created_at DESC);

-- Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE team ENABLE ROW LEVEL SECURITY;

-- Public can read properties, units, projects, team
CREATE POLICY "Public read properties" ON properties FOR SELECT USING (true);
CREATE POLICY "Public read units" ON units FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read team" ON team FOR SELECT USING (is_active = true);

-- Public can insert enquiries
CREATE POLICY "Public insert enquiries" ON enquiries FOR INSERT WITH CHECK (true);

-- Authenticated users (admin) can do everything
CREATE POLICY "Admin all properties" ON properties FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all units" ON units FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all enquiries" ON enquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all team" ON team FOR ALL USING (auth.role() = 'authenticated');

-- Storage bucket for images (run separately in Supabase dashboard)
-- Create bucket named 'property-images' with public access
