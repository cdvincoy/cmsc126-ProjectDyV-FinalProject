-- Users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  bio TEXT,
  birthday TIMESTAMP,
  address TEXT,
  profile_img TEXT,
  designation TEXT,
  fb_link TEXT,
  messenger_link TEXT,
  github  TEXT,
  linkedin  TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(20), -- "hard" | "soft"

  user_id INT REFERENCES users(id) ON DELETE CASCADE
);

-- Education
CREATE TABLE IF NOT EXISTS education (
  id SERIAL PRIMARY KEY,
  school VARCHAR(255) NOT NULL,
  degree TEXT,
  year_start INT,
  year_end INT,

  user_id INT REFERENCES users(id) ON DELETE CASCADE
);

-- Certifications
CREATE TABLE IF NOT EXISTS certifications (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  organization VARCHAR(255) NOT NULL,
  date_issued TIMESTAMP,
  link TEXT,

  user_id INT REFERENCES users(id) ON DELETE CASCADE
);

-- Awards
CREATE TABLE IF NOT EXISTS awards (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  date TIMESTAMP,

  user_id INT REFERENCES users(id) ON DELETE CASCADE
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  link TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  user_id INT REFERENCES users(id) ON DELETE CASCADE
);

-- Work Experience
CREATE TABLE IF NOT EXISTS work_experience (
  id SERIAL PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  description TEXT,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  is_current BOOLEAN DEFAULT FALSE,

  user_id INT REFERENCES users(id) ON DELETE CASCADE
);

-- Jobs
CREATE TABLE IF NOT EXISTS jobs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  location VARCHAR(255),
  type VARCHAR(50), -- "job" | "project"
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  user_id INT REFERENCES users(id) ON DELETE CASCADE
);

-- Applications
CREATE TABLE IF NOT EXISTS applications (
  id SERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',

  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  job_id INT REFERENCES jobs(id) ON DELETE CASCADE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comments
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  user_id INT REFERENCES users(id),
  portfolio_owner_id INT REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);