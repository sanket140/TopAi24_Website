/*
  # Create projects table

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `image` (text, image URL)
      - `category` (text)
      - `featured` (boolean)
      - `technologies` (text array)
      - `custom_url` (text, optional)
      - `slug` (text, unique)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `content` (jsonb, for detailed project content)

  2. Security
    - Enable RLS on `projects` table
    - Add policy for public read access (projects are public)

  3. Sample Data
    - Insert existing projects data
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  category text NOT NULL,
  featured boolean DEFAULT false,
  technologies text[] DEFAULT '{}',
  custom_url text,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  content jsonb DEFAULT '{}'::jsonb
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access to projects
CREATE POLICY "Projects are publicly readable"
  ON projects
  FOR SELECT
  TO public
  USING (true);

-- Insert sample projects data
INSERT INTO projects (title, description, image, category, featured, technologies, custom_url, slug, content) VALUES
(
  'Velvo Restaurant Website',
  'Velvo is a premium Indian restaurant website that provides a complete digital experience for customers. The website features a sophisticated design with smooth animations, comprehensive menu display, online ordering integration, table booking functionality, and customer engagement features. Built with modern web technologies, it offers an exceptional user experience across all devices.',
  'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Web App',
  true,
  ARRAY['React', 'Node.js', 'MongoDB'],
  'https://velvo.app.topai24.com/',
  'velvo-restaurant',
  '{
    "hero": {
      "title": "Velvo Restaurant",
      "subtitle": "Premium Indian Dining Experience",
      "description": "A sophisticated restaurant website with online ordering and table booking"
    },
    "features": [
      "Online Menu Display",
      "Table Booking System", 
      "Order Management",
      "Customer Reviews",
      "Location & Hours"
    ],
    "architecture": {
      "frontend": "React with responsive design",
      "backend": "Node.js with Express",
      "database": "MongoDB for menu and orders",
      "deployment": "AWS with CloudFront CDN"
    }
  }'::jsonb
),
(
  'Apex Financials – Professional CA Website',
  'A comprehensive, production-ready website for Chartered Accountant services built with React, TypeScript, and Tailwind CSS. This modern, responsive website showcases professional CA services with interactive features and excellent user experience.',
  'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Web App',
  true,
  ARRAY['React', 'TypeScript', 'Tailwind CSS'],
  'https://apex.app.topai24.com/',
  'apex-financials',
  '{
    "hero": {
      "title": "Apex Financials",
      "subtitle": "Professional CA Services",
      "description": "Modern website for Chartered Accountant services with client portal"
    },
    "features": [
      "Service Portfolio",
      "Client Portal",
      "Document Upload",
      "Appointment Booking",
      "Tax Calculator"
    ],
    "architecture": {
      "frontend": "React with TypeScript",
      "styling": "Tailwind CSS",
      "deployment": "Vercel with custom domain",
      "features": "Interactive forms and calculators"
    }
  }'::jsonb
),
(
  'Flamora',
  'Flamora is more than just a landing page — it''s a testament to how modern web technologies can accelerate product presentations, even for solo builders. With a strong concept, smart tools, and creative direction, anyone can ship a beautiful website in record time.',
  'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Mobile App',
  true,
  ARRAY['React Native', 'Firebase', 'Node.js'],
  'https://flamora.app.topai24.com/',
  'flamora',
  '{
    "hero": {
      "title": "Flamora",
      "subtitle": "Modern Product Showcase",
      "description": "Beautiful landing page built with modern web technologies"
    },
    "features": [
      "Responsive Design",
      "Smooth Animations",
      "Product Gallery",
      "Contact Integration",
      "SEO Optimized"
    ],
    "architecture": {
      "frontend": "React with modern CSS",
      "animations": "Framer Motion",
      "deployment": "Fast CDN delivery",
      "performance": "Optimized for speed"
    }
  }'::jsonb
),
(
  'GTZP',
  'GTZP is a fun, interactive app that helps you discover and engage with community-driven short videos.',
  'https://images.pexels.com/photos/1367276/pexels-photo-1367276.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Mobile App',
  true,
  ARRAY['Flutter', 'Firebase', 'Node.js'],
  null,
  'gtzp',
  '{
    "hero": {
      "title": "GTZP",
      "subtitle": "Greater Than Zero Percent",
      "description": "Discover and engage with nonprofits through interactive videos"
    },
    "features": [
      "Interest-Based Feed",
      "Smart Swipe Navigation", 
      "Integrated Donations",
      "Social Engagement",
      "Impact Tracking"
    ],
    "architecture": {
      "frontend": "Flutter cross-platform",
      "backend": "AWS Lambda serverless",
      "storage": "AWS S3 for media",
      "payments": "Stripe integration"
    }
  }'::jsonb
),
(
  'Taskora',
  'Taskora is a mobile freelance marketplace application that connects clients with freelancers',
  '/projects/Taskora/Taskora_banner.jpg',
  'Mobile App',
  true,
  ARRAY['Flutter', 'Supabase', 'Node.js'],
  null,
  'taskora',
  '{
    "hero": {
      "title": "Taskora",
      "subtitle": "Mobile Freelance Marketplace",
      "description": "Connecting clients with top freelancers through seamless mobile experience"
    },
    "features": [
      "Role Selection",
      "Project Posting",
      "Advanced Search",
      "Proposals System",
      "Integrated Chat",
      "Rating System"
    ],
    "architecture": {
      "frontend": "Flutter with Clean Architecture",
      "backend": "Supabase with Node.js",
      "state": "BLoC pattern",
      "database": "PostgreSQL"
    }
  }'::jsonb
),
(
  'Fitness Application',
  'This is a fitness coaching and trainee management app that bridges the gap between trainers and their clients.',
  '/projects/Fitness Application/fitness_banner.png',
  'Mobile App',
  true,
  ARRAY['Flutter', 'Supabase', 'Node.js'],
  null,
  'fitness-application',
  '{
    "hero": {
      "title": "FitConnect",
      "subtitle": "Fitness Coaching & Trainee Management",
      "description": "Bridging the gap between trainers and clients with workout plans and nutrition guidance"
    },
    "features": [
      "Home Dashboard",
      "Workout Schedule",
      "Video Player",
      "Meal Plans",
      "Progress Tracking",
      "AI Plan Assignment"
    ],
    "architecture": {
      "frontend": "Flutter with BLoC",
      "backend": "Supabase with Node.js",
      "ai": "AI-assisted plan creation",
      "media": "Video streaming integration"
    }
  }'::jsonb
),
(
  'Job AI',
  'An AI-powered recruitment and job-matching mobile application designed for both job seekers and recruiters.',
  '/projects/Job Ai/aijob_banner.png',
  'Mobile App',
  true,
  ARRAY['Flutter', 'Supabase', 'TensorFlow', 'OpenAI'],
  null,
  'job-ai',
  '{
    "hero": {
      "title": "JobAI",
      "subtitle": "AI-Powered Recruitment Platform",
      "description": "Revolutionizing hiring with AI-powered job matching and resume optimization"
    },
    "features": [
      "Candidate Dashboard",
      "AI Job Matching",
      "Resume Tailoring",
      "Mock Interviews",
      "Recruiter Dashboard",
      "Hiring Analytics"
    ],
    "architecture": {
      "frontend": "Flutter with BLoC",
      "backend": "Supabase with Node.js",
      "ai": "TensorFlow for matching, OpenAI for interviews",
      "ml": "Machine learning models"
    }
  }'::jsonb
),
(
  'StyleConnect',
  'StyleConnect - Social Commerce Platform where fashion discovery meets seamless shopping.',
  '/projects/Style Connect/fashion_social_banner.png',
  'Mobile App',
  true,
  ARRAY['Flutter', 'Supabase', 'Stripe', 'Node.js'],
  null,
  'styleconnect',
  '{
    "hero": {
      "title": "StyleConnect",
      "subtitle": "Social Commerce Platform",
      "description": "Where fashion discovery meets seamless shopping in Instagram-like experience"
    },
    "features": [
      "Social Shopping Feed",
      "Save & Share",
      "Direct Chat",
      "One-Tap Checkout",
      "Vendor Dashboard",
      "AI Analytics"
    ],
    "architecture": {
      "frontend": "Flutter with Riverpod",
      "backend": "Supabase with Node.js",
      "payments": "Stripe integration",
      "social": "Real-time feed and messaging"
    }
  }'::jsonb
),
(
  'RetailPulse',
  'RetailPulse - Mobile POS Management System with real-time analytics.',
  'https://images.pexels.com/photos/1367276/pexels-photo-1367276.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Mobile App',
  true,
  ARRAY['Flutter', 'Supabase', 'Stripe', 'Node.js'],
  null,
  'retailpulse',
  '{
    "hero": {
      "title": "RetailPulse",
      "subtitle": "Mobile POS Management System",
      "description": "Real-time sales tracking, inventory management, and business analytics"
    },
    "features": [
      "POS Dashboard",
      "Inventory Tracker",
      "Customer History",
      "Employee Management",
      "Tax Summaries",
      "Daily Reports"
    ],
    "architecture": {
      "frontend": "Flutter with Riverpod",
      "backend": "Supabase with Node.js",
      "payments": "Stripe integration",
      "analytics": "Real-time reporting"
    }
  }'::jsonb
),
(
  'Wellness Application',
  'Your mindful companion — one day at a time. Mental wellness platform with meditation and mood tracking.',
  '/projects/Mental Wellness/wellness_banner.png',
  'Mobile App',
  true,
  ARRAY['Flutter', 'Supabase', 'Node.js'],
  null,
  'wellness',
  '{
    "hero": {
      "title": "MindfulPath",
      "subtitle": "Your Mental Wellness Companion",
      "description": "Mobile-first platform blending meditation, mood tracking, and community support"
    },
    "features": [
      "Home Dashboard",
      "Mood Tracking",
      "CBT Journaling",
      "Meditation Library",
      "Community Support",
      "Goal Tracking"
    ],
    "architecture": {
      "frontend": "Flutter with state management",
      "backend": "Supabase with Node.js",
      "features": "Meditation library and progress tracking",
      "community": "Social features for support"
    }
  }'::jsonb
),
(
  'Eventra',
  'A mobile-first event discovery and social engagement platform that helps users find events, RSVP, create their own events, and connect with like-minded people.',
  '/projects/eventra/eventra_banner.png',
  'Mobile App',
  true,
  ARRAY['Flutter', 'Supabase', 'Google Maps'],
  null,
  'eventra',
  '{
    "hero": {
      "title": "Eventra",
      "subtitle": "Discover & Create Social Events",
      "description": "Mobile-first platform to find events, RSVP, create your own, and connect"
    },
    "features": [
      "Swipe Feed",
      "Interest Matching",
      "Quick Creation",
      "Social Network",
      "Event Discovery",
      "RSVP Management"
    ],
    "architecture": {
      "frontend": "Flutter with state management",
      "backend": "Supabase with realtime",
      "maps": "Google Maps integration",
      "social": "Social networking features"
    }
  }'::jsonb
),
(
  'Poolr',
  'Poolr is a ridesharing app built exclusively for parents of school-going kids.',
  'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Mobile App',
  true,
  ARRAY['Flutter', 'Firebase', 'Google Maps API'],
  null,
  'poolr',
  '{
    "hero": {
      "title": "Poolr",
      "subtitle": "School Ridesharing App",
      "description": "Safe, scheduled ridesharing exclusively for parents of school-going kids"
    },
    "features": [
      "Verified Parent Network",
      "Ride Scheduling",
      "Live Ride Tracking",
      "Easy Payments",
      "Safety Features",
      "Emergency Support"
    ],
    "architecture": {
      "frontend": "Flutter cross-platform",
      "backend": "Firebase with Cloud Functions",
      "maps": "Google Maps for tracking",
      "payments": "Stripe and Apple Pay"
    }
  }'::jsonb
),
(
  'Calorii',
  'A comprehensive health monitoring solution that tracks workouts, nutrition, and wellness metrics.',
  'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Mobile App',
  true,
  ARRAY['React Native', 'HealthKit', 'Firebase'],
  null,
  'calorii',
  '{
    "hero": {
      "title": "Calorii",
      "subtitle": "Wellness App",
      "description": "Your personalized wellness hub with expert-led health and nutrition information"
    },
    "features": [
      "Expert Video Content",
      "Topic-Based Learning",
      "FAQ & Resources",
      "Premium Access",
      "Nutrition Tracking",
      "Progress Analytics"
    ],
    "architecture": {
      "frontend": "React Native",
      "backend": "AWS Lambda serverless",
      "health": "HealthKit integration",
      "content": "YouTube API for videos"
    }
  }'::jsonb
),
(
  'Gumbo',
  'It''s a collaborative event memory app that brings all your guests'' photos and videos into one shared memory wall.',
  'https://images.pexels.com/photos/1174775/pexels-photo-1174775.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Mobile App',
  false,
  ARRAY['React Native', 'AWS S3', 'Node.js'],
  null,
  'gumbo',
  '{
    "hero": {
      "title": "Gumbo",
      "subtitle": "Collaborative Event Memory App",
      "description": "Brings all your guests photos and videos into one shared memory wall"
    },
    "features": [
      "Event-Based Memory Walls",
      "In-App Editing Tools",
      "Private & Controlled",
      "Download & Share",
      "Real-time Upload",
      "Guest Collaboration"
    ],
    "architecture": {
      "frontend": "React Native",
      "backend": "AWS Lambda with API Gateway",
      "storage": "AWS S3 for media",
      "auth": "Firebase Authentication"
    }
  }'::jsonb
),
(
  'Willow',
  'A comprehensive child services platform to find, book, and pay for trusted child-related services.',
  'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
  'E-commerce',
  false,
  ARRAY['Flutter', 'Firebase', 'Laravel'],
  null,
  'willow',
  '{
    "hero": {
      "title": "Willow",
      "subtitle": "Child Services Platform",
      "description": "Your trusted child services platform to find, book, and pay for services"
    },
    "features": [
      "Multi-Category Booking",
      "Service Confirmation",
      "Integrated Payments",
      "Verified Reviews",
      "Provider Profiles",
      "Safety Features"
    ],
    "architecture": {
      "frontend": "Flutter mobile app",
      "backend": "Laravel API with Firebase",
      "payments": "Stripe integration",
      "verification": "Background check system"
    }
  }'::jsonb
);