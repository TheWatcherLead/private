-- Axis Concept — Seed Data
-- Run this AFTER schema.sql in the Supabase SQL editor
-- Contains real projects and properties from www.axisconcept.in

-- ============================================================
-- PROPERTIES (active listings / ongoing / coming soon)
-- ============================================================

INSERT INTO properties (slug, title, description, type, status, location, city, price_from, price_to, possession_date, thumbnail_url, gallery_urls, amenities, highlights, rera_number, is_featured)
VALUES
(
  'axis-vault-01',
  'Axis Vault – 01',
  'A purpose-built warehousing facility designed to support South India''s industrial sector. The facility features optimal connectivity and operational efficiency for manufacturing, retail, e-commerce, and cold chain supply operations.',
  'warehouse',
  'active',
  'Thally, Hosur, Tamil Nadu',
  'Hosur',
  NULL, NULL, NULL,
  'https://axisconcept.in/wp-content/uploads/2025/06/BOCHS.jpg',
  ARRAY['https://axisconcept.in/wp-content/uploads/2025/06/BOCHS.jpg','https://axisconcept.in/wp-content/uploads/2025/04/project_plan_img1.jpg','https://axisconcept.in/wp-content/uploads/2025/04/project_plan_img2.jpg','https://axisconcept.in/wp-content/uploads/2025/04/project_plan_img3.jpg'],
  ARRAY['24x7 Security','CCTV Surveillance System','24-Hour Maintenance','Firefighting System','Parking'],
  ARRAY['State-of-the-art infrastructure','Expansive loading bays','Strategic positioning in industrial belt','Primary distribution hub or scalable storage solution'],
  NULL,
  true
),
(
  'axis-vault-02',
  'Axis Vault – 02',
  'A purpose-built warehousing facility designed to meet South India''s industrial demands. High-performance logistics environment designed to support industries ranging from manufacturing and retail to e-commerce and cold chain supply.',
  'warehouse',
  'active',
  'Thally, Hosur, Tamil Nadu',
  'Hosur',
  NULL, NULL, NULL,
  'https://axisconcept.in/wp-content/uploads/2025/07/Vault-pup2khvm8xkffsfdiajro2yianwtuhyugv6zdifu00.jpg',
  ARRAY['https://axisconcept.in/wp-content/uploads/2025/07/Vault-pup2khvm8xkffsfdiajro2yianwtuhyugv6zdifu00.jpg','https://axisconcept.in/wp-content/uploads/2025/04/project_plan_img1.jpg','https://axisconcept.in/wp-content/uploads/2025/04/project_plan_img2.jpg','https://axisconcept.in/wp-content/uploads/2025/04/project_plan_img3.jpg'],
  ARRAY['24x7 Security','CCTV Surveillance System','24-Hour Maintenance','Firefighting System','Parking'],
  ARRAY['Strategically positioned for optimal connectivity','Expansive loading bays','Seamless access and secure storage','Scalable storage solutions'],
  NULL,
  true
),
(
  'axis-ekatva',
  'Axis Ekatva',
  'A modern co-living development featuring 323 fully furnished 1BHK smart studios designed for young professionals and students, offering shared amenities and community-focused living in the heart of Whitefield.',
  'residential',
  'coming_soon',
  'Whitefield, Bengaluru',
  'Bangalore',
  NULL, NULL, NULL,
  'https://axisconcept.in/wp-content/uploads/2025/09/Axis-Ekatva-768x427.jpg',
  ARRAY['https://axisconcept.in/wp-content/uploads/2025/09/Axis-Ekatva-768x427.jpg','https://axisconcept.in/wp-content/uploads/2025/04/project_plan_img1.jpg','https://axisconcept.in/wp-content/uploads/2025/04/project_plan_img2.jpg'],
  ARRAY['24/7 Security','Surveillance System','Gym & Fitness Center','Swimming Pool','High-Speed Connectivity','Community Centre','Rooftop Gardens','Wellness Zones','Parking','Firefighting System','24-Hour Maintenance','Rainwater Harvesting','Solar Power'],
  ARRAY['323 fully furnished 1BHK smart studios','Retail and co-working spaces','Transparent leasing and flexible terms','Sustainability features including solar power','Strategic proximity to IT corridors and educational institutions'],
  NULL,
  true
),
(
  'axis-niran',
  'Axis Niran',
  'Thoughtfully crafted 2 & 3 BHK apartments that combine elegance, comfort, and sustainability on Sarjapur Road. The project emphasizes natural light, ventilation, and proximity to IT corridors with built-in eco-friendly measures.',
  'residential',
  'coming_soon',
  'Sarjapur Road, Bengaluru',
  'Bangalore',
  NULL, NULL, NULL,
  'https://axisconcept.in/wp-content/uploads/2025/08/20250619_ACC_Niran_Render_Logo-2-768x657.jpg',
  ARRAY['https://axisconcept.in/wp-content/uploads/2025/08/20250619_ACC_Niran_Render_Logo-2-768x657.jpg','https://axisconcept.in/wp-content/uploads/2025/04/project_plan_img1.jpg','https://axisconcept.in/wp-content/uploads/2025/04/project_plan_img2.jpg'],
  ARRAY['24/7 Security','Surveillance System','Gym & Fitness Center','Children''s Play Area','24-Hour Maintenance','Firefighting System','Yoga & Aerobics','Party Hall','Landscaped Gardens','Swimming Pool','Meditation Zone','Walking Pathways','Tree Plaza','Seating Deck'],
  ARRAY['4 floors including basement parking','Connectivity to Electronic City, Whitefield, Koramangala','Proximity to schools, hospitals, tech parks','Rainwater harvesting and energy-efficient systems'],
  NULL,
  false
),
(
  'axis-oaklyn',
  'Axis Oaklyn',
  'A gated residential community where style meets serenity, featuring modern 2 & 3 BHK apartments with distinctive terracotta exteriors and spacious layouts designed for natural light and comfortable living in Yelahanka.',
  'residential',
  'active',
  'Yelahanka, Bengaluru',
  'Bangalore',
  NULL, NULL, '2026-03-31',
  'https://axisconcept.in/wp-content/uploads/2025/06/Axis-Oaklyn-768x645.jpg',
  ARRAY['https://axisconcept.in/wp-content/uploads/2025/06/Axis-Oaklyn-768x645.jpg','https://axisconcept.in/wp-content/uploads/2025/04/project_plan_img1.jpg','https://axisconcept.in/wp-content/uploads/2025/04/project_plan_img2.jpg','https://axisconcept.in/wp-content/uploads/2025/04/project_plan_img3.jpg'],
  ARRAY['24x7 Security','Surveillance System','Fitness Center','Children''s Play Area','24-Hour Maintenance','Swimming Pool','Firefighting System','Landscaped Gardens','Yoga Zone','Parking','Party Hall','Club House','Walking Pathways','Reflexology Walkway'],
  ARRAY['Distinctive brick-style/terracotta exteriors','Secure gated community','5-floor structure with dedicated stilt parking','Spacious apartment designs with emphasis on natural lighting'],
  NULL,
  true
),
(
  'mandara-by-axis',
  'Mandara by Axis',
  'A managed farm plot community offering slow, soulful living with villa development opportunities. The property features natural landscapes, forest trails, and proximity to Chunchi Falls and Shivanasamudra near Kanakapura Road.',
  'residential',
  'active',
  'Kanakapura Road, Malavalli, Karnataka',
  'Bangalore',
  NULL, NULL, NULL,
  'https://axisconcept.in/wp-content/uploads/2025/06/Mandara-1-1290x600.jpg',
  ARRAY['https://axisconcept.in/wp-content/uploads/2025/06/Mandara-1-1290x600.jpg','https://axisconcept.in/wp-content/uploads/2025/04/project_plan_img1.jpg','https://axisconcept.in/wp-content/uploads/2025/04/project_plan_img2.jpg'],
  ARRAY['24x7 Security','CCTV Surveillance System','Fitness Center','Children''s Play Area','24-Hour Maintenance','Swimming Pool','Firefighting System','Landscape Gardens'],
  ARRAY['Valley-framed landscape setting','Community gardens and forest trails','Near Chunchi Falls and Shivanasamudra','Managed and secure property','Flexible development timeline'],
  NULL,
  false
);

-- ============================================================
-- PROJECTS (completed portfolio)
-- ============================================================

INSERT INTO projects (slug, title, description, type, location, year_completed, area_sqft, gallery_urls, highlights, thumbnail_url, is_featured)
VALUES
(
  'axis-raag',
  'Axis Raag',
  'Contemporary living in the vibrant neighbourhood of JP Nagar with spacious layouts, abundant natural light and premium finishes, designed to balance urban convenience with residential comfort.',
  'residential',
  'J.P. Nagar, Bengaluru',
  2024,
  6300,
  ARRAY['https://axisconcept.in/wp-content/uploads/2025/09/Axis-Raag-1-768x431.png','https://axisconcept.in/wp-content/uploads/2025/04/project_plan_img1.jpg','https://axisconcept.in/wp-content/uploads/2025/04/project_plan_img2.jpg'],
  ARRAY['6 floors with 2 basement parking levels','Luxury indoor spaces in active neighbourhood','Adjacent to cafés, shopping, schools, and healthcare','2 & 3 BHK apartments','24/7 Security & Surveillance','Gym, Club House, EV Charging'],
  'https://axisconcept.in/wp-content/uploads/2025/09/Axis-Raag-1-768x431.png',
  true
),
(
  'axis-tatvam',
  'Axis Tatvam',
  'Luxury villa community blending elegance, tranquility and convenience in South Bengaluru. Podium villas with premium finishes and landscaped surroundings, opposite the Art of Living campus on Kanakapura Road.',
  'residential',
  'Kanakapura Road, Bengaluru',
  2023,
  NULL,
  ARRAY['https://axisconcept.in/wp-content/uploads/2025/09/01-1-768x342.jpg','https://axisconcept.in/wp-content/uploads/2025/04/project_plan_img1.jpg','https://axisconcept.in/wp-content/uploads/2025/04/project_plan_img2.jpg'],
  ARRAY['3 & 4 BHK designer villas','2-floor villas with ground-floor parking','Close to NICE Road and quality institutions','Premium finishes and thoughtful design','Swimming pool, gym, basketball & badminton courts','Rainwater harvesting'],
  'https://axisconcept.in/wp-content/uploads/2025/09/01-1-768x342.jpg',
  true
),
(
  'science-centre-agastya',
  'Science Centre – Axis & Agastya Collaboration',
  'A landmark academic facility built in collaboration with the Agastya International Foundation, designed to inspire curiosity and hands-on learning for students across Karnataka.',
  'academic',
  'Karnataka',
  2022,
  NULL,
  ARRAY['https://axisconcept.in/wp-content/uploads/2025/06/BOCHS.jpg'],
  ARRAY['Collaboration with Agastya International Foundation','Hands-on STEM learning environment','Designed for students across Karnataka','Biophilic design integrated throughout'],
  'https://axisconcept.in/wp-content/uploads/2025/06/BOCHS.jpg',
  true
),
(
  'axis-banyan-county',
  'Axis Banyan County',
  'A completed residential community off Mysore Road, designed with community-centric planning and biophilic elements that bring residents closer to nature while maintaining urban connectivity.',
  'residential',
  'Off Mysore Road, Bengaluru',
  2021,
  NULL,
  ARRAY['https://axisconcept.in/wp-content/uploads/2025/06/BOCHS.jpg','https://axisconcept.in/wp-content/uploads/2025/04/project_plan_img1.jpg'],
  ARRAY['Community-centric residential layout','Biophilic landscaping throughout','Off Mysore Road with strong connectivity','Premium construction quality'],
  'https://axisconcept.in/wp-content/uploads/2025/06/BOCHS.jpg',
  false
);

-- ============================================================
-- Update stats in homepage (update testimonials in code)
-- These are referenced from static components — no DB update needed
-- ============================================================

-- Done!
-- After running this seed:
-- 1. Properties page will show 6 active listings
-- 2. Projects page will show 4 completed portfolio items
-- 3. Homepage featured properties/projects will populate
