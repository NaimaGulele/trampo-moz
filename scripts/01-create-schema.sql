-- TrampoMoz Database Schema
-- Províncias e cidades de Moçambique com sistema completo de jobs

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================== PROVINCES ====================
CREATE TABLE IF NOT EXISTS provinces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  code VARCHAR(10) NOT NULL UNIQUE,
  region VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Mozambique provinces
INSERT INTO provinces (name, code, region) VALUES
  ('Sofala', 'SOF', 'Central'),
  ('Gaza', 'GAZ', 'Southern'),
  ('Inhambane', 'INH', 'Southern'),
  ('Manica', 'MAN', 'Central'),
  ('Maputo', 'MAP', 'Southern'),
  ('Maputo Cidade', 'MPC', 'Southern'),
  ('Nampula', 'NAM', 'Northern'),
  ('Niassa', 'NIA', 'Northern'),
  ('Zambézia', 'ZAM', 'Central'),
  ('Tete', 'TET', 'Central'),
  ('Cabo Delgado', 'CAB', 'Northern')
ON CONFLICT (code) DO NOTHING;

-- ==================== CITIES ====================
CREATE TABLE IF NOT EXISTS cities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  province_id UUID NOT NULL,
  population INT,
  is_major BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (province_id) REFERENCES provinces(id) ON DELETE CASCADE,
  UNIQUE(name, province_id)
);

-- Insert Major Cities
INSERT INTO cities (name, province_id, population, is_major) 
SELECT 'Maputo', id, 1100000, TRUE FROM provinces WHERE code = 'MPC'
ON CONFLICT (name, province_id) DO NOTHING;

INSERT INTO cities (name, province_id, population, is_major) 
SELECT 'Matola', id, 900000, TRUE FROM provinces WHERE code = 'MAP'
ON CONFLICT (name, province_id) DO NOTHING;

INSERT INTO cities (name, province_id, population, is_major) 
SELECT 'Beira', id, 550000, TRUE FROM provinces WHERE code = 'SOF'
ON CONFLICT (name, province_id) DO NOTHING;

INSERT INTO cities (name, province_id, population, is_major) 
SELECT 'Nampula', id, 600000, TRUE FROM provinces WHERE code = 'NAM'
ON CONFLICT (name, province_id) DO NOTHING;

INSERT INTO cities (name, province_id, population, is_major) 
SELECT 'Gaza', id, 250000, FALSE FROM provinces WHERE code = 'GAZ'
ON CONFLICT (name, province_id) DO NOTHING;

INSERT INTO cities (name, province_id, population, is_major) 
SELECT 'Inhambane', id, 200000, FALSE FROM provinces WHERE code = 'INH'
ON CONFLICT (name, province_id) DO NOTHING;

INSERT INTO cities (name, province_id, population, is_major) 
SELECT 'Chimoio', id, 280000, FALSE FROM provinces WHERE code = 'MAN'
ON CONFLICT (name, province_id) DO NOTHING;

INSERT INTO cities (name, province_id, population, is_major) 
SELECT 'Quelimane', id, 400000, FALSE FROM provinces WHERE code = 'ZAM'
ON CONFLICT (name, province_id) DO NOTHING;

INSERT INTO cities (name, province_id, population, is_major) 
SELECT 'Tete', id, 180000, FALSE FROM provinces WHERE code = 'TET'
ON CONFLICT (name, province_id) DO NOTHING;

INSERT INTO cities (name, province_id, population, is_major) 
SELECT 'Lichinga', id, 150000, FALSE FROM provinces WHERE code = 'NIA'
ON CONFLICT (name, province_id) DO NOTHING;

INSERT INTO cities (name, province_id, population, is_major) 
SELECT 'Pemba', id, 320000, TRUE FROM provinces WHERE code = 'CAB'
ON CONFLICT (name, province_id) DO NOTHING;

-- More cities per province
INSERT INTO cities (name, province_id, is_major) 
SELECT 'Chokwe', id, FALSE FROM provinces WHERE code = 'GAZ'
ON CONFLICT (name, province_id) DO NOTHING;

INSERT INTO cities (name, province_id, is_major) 
SELECT 'Vilanculos', id, FALSE FROM provinces WHERE code = 'INH'
ON CONFLICT (name, province_id) DO NOTHING;

INSERT INTO cities (name, province_id, is_major) 
SELECT 'Ressano Garcia', id, FALSE FROM provinces WHERE code = 'MAP'
ON CONFLICT (name, province_id) DO NOTHING;

INSERT INTO cities (name, province_id, is_major) 
SELECT 'Xai-Xai', id, FALSE FROM provinces WHERE code = 'GAZ'
ON CONFLICT (name, province_id) DO NOTHING;

-- ==================== CATEGORIES ====================
CREATE TABLE IF NOT EXISTS job_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  icon VARCHAR(50),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO job_categories (name, icon, description) VALUES
  ('Tecnologia', '💻', 'Desenvolvimento, TI, Software'),
  ('Vendas', '💼', 'Vendedor, Gerente de Vendas'),
  ('Educação', '📚', 'Professor, Instructor'),
  ('Saúde', '⚕️', 'Médico, Enfermeiro, Farmacêutico'),
  ('Construção', '🏗️', 'Pedreiro, Engenheiro Civil'),
  ('Hotelaria', '🏨', 'Rececionista, Chef'),
  ('Transportes', '🚗', 'Motorista, Logística'),
  ('Comércio', '🛍️', 'Caixa, Atendente'),
  ('Administração', '📋', 'Secretária, RH'),
  ('Marketing', '📢', 'Social Media, Designer'),
  ('Diversos', '🎯', 'Outros serviços')
ON CONFLICT (name) DO NOTHING;

-- ==================== USERS ====================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  avatar_url TEXT,
  user_type VARCHAR(20) NOT NULL DEFAULT 'job_seeker', -- job_seeker or employer
  province_id UUID,
  city_id UUID,
  bio TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (province_id) REFERENCES provinces(id),
  FOREIGN KEY (city_id) REFERENCES cities(id)
);

-- ==================== JOBS ====================
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category_id UUID,
  province_id UUID NOT NULL,
  city_id UUID NOT NULL,
  salary_min INT,
  salary_max INT,
  salary_currency VARCHAR(10) DEFAULT 'MZN',
  employment_type VARCHAR(50) DEFAULT 'full_time', -- full_time, part_time, contract
  image_url TEXT,
  company_name VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  views INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES job_categories(id),
  FOREIGN KEY (province_id) REFERENCES provinces(id),
  FOREIGN KEY (city_id) REFERENCES cities(id)
);

-- ==================== SAVED JOBS ====================
CREATE TABLE IF NOT EXISTS saved_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  job_id UUID NOT NULL,
  saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  UNIQUE(user_id, job_id)
);

-- ==================== APPLICATIONS ====================
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  job_id UUID NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, accepted, rejected
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  UNIQUE(user_id, job_id)
);

-- ==================== INDEXES ====================
CREATE INDEX idx_jobs_province ON jobs(province_id);
CREATE INDEX idx_jobs_city ON jobs(city_id);
CREATE INDEX idx_jobs_category ON jobs(category_id);
CREATE INDEX idx_jobs_user ON jobs(user_id);
CREATE INDEX idx_jobs_active ON jobs(is_active);
CREATE INDEX idx_jobs_featured ON jobs(is_featured);
CREATE INDEX idx_cities_province ON cities(province_id);
CREATE INDEX idx_users_province ON users(province_id);
CREATE INDEX idx_users_city ON users(city_id);
CREATE INDEX idx_saved_jobs_user ON saved_jobs(user_id);
CREATE INDEX idx_applications_user ON applications(user_id);
CREATE INDEX idx_applications_job ON applications(job_id);

-- ==================== FUNCTIONS ====================
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==================== ROW LEVEL SECURITY ====================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Users can see public job info, saved_jobs are private
CREATE POLICY "Jobs are viewable by everyone" ON jobs
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Users can insert their own jobs" ON jobs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own jobs" ON jobs
  FOR UPDATE USING (auth.uid() = user_id);

-- Saved jobs are private to user
CREATE POLICY "Users can view their own saved jobs" ON saved_jobs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved jobs" ON saved_jobs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved jobs" ON saved_jobs
  FOR DELETE USING (auth.uid() = user_id);

-- Applications are private
CREATE POLICY "Users can view their own applications" ON applications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can apply for jobs" ON applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);
