CREATE TABLE roles (
    role_id INT IDENTITY PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE genders (
    gender_id INT IDENTITY PRIMARY KEY,
    name VARCHAR(20)
);

CREATE TABLE booking_statuses (
    status_id INT IDENTITY PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE roadmap_item_types (
    type_id INT IDENTITY PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE course_levels (
    level_id INT IDENTITY PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE center_types (
    type_id INT IDENTITY PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE degrees (
    degree_id INT IDENTITY PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE test_types (
    type_id INT IDENTITY PRIMARY KEY,
    name VARCHAR(50)
);

-- =========================
-- USERS
-- =========================

CREATE TABLE users (
    user_id INT IDENTITY PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash NVARCHAR(MAX) NOT NULL,
    full_name VARCHAR(255),
    role_id INT REFERENCES roles(role_id),
    created_at DATETIME2 DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE users
ALTER COLUMN password_hash NVARCHAR(255) NULL;
CREATE TABLE user_profiles (
    profile_id INT IDENTITY PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    date_of_birth DATE,
    gender_id INT REFERENCES genders(gender_id),
    school VARCHAR(255),
    grade INT,
    bio NVARCHAR(MAX)
);

-- =========================
-- TEST SYSTEM
-- =========================

CREATE TABLE tests (
    test_id INT IDENTITY PRIMARY KEY,
    name VARCHAR(100),
    type_id INT REFERENCES test_types(type_id)
);

CREATE TABLE test_dimensions (
    dimension_id INT IDENTITY PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE questions (
    question_id INT IDENTITY PRIMARY KEY,
    test_id INT REFERENCES tests(test_id) ON DELETE CASCADE,
    content NVARCHAR(MAX),
    dimension VARCHAR(10)
);

CREATE TABLE choices (
    choice_id INT IDENTITY PRIMARY KEY,
    question_id INT REFERENCES questions(question_id) ON DELETE CASCADE,
    content NVARCHAR(MAX),
    score_value INT
);

CREATE TABLE user_answers (
    answer_id INT IDENTITY PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    question_id INT REFERENCES questions(question_id),
    choice_id INT REFERENCES choices(choice_id),
    CONSTRAINT unique_user_question UNIQUE (user_id, question_id)
);

-- =========================
-- FACTORS
-- =========================

CREATE TABLE factor_types (
    type_id INT IDENTITY PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE factors (
    factor_id INT IDENTITY PRIMARY KEY,
    name VARCHAR(100),
    type_id INT REFERENCES factor_types(type_id)
);

CREATE TABLE question_factors (
    id INT IDENTITY PRIMARY KEY,
    question_id INT REFERENCES questions(question_id) ON DELETE CASCADE,
    factor_id INT REFERENCES factors(factor_id),
    weight NUMERIC(3,2)
);

-- =========================
-- CAREERS
-- =========================

CREATE TABLE careers (
    career_id INT IDENTITY PRIMARY KEY,
    name VARCHAR(255),
    description NVARCHAR(MAX),
    avg_salary NUMERIC(12,2),
    demand_level INT
);

CREATE TABLE career_factors (
    id INT IDENTITY PRIMARY KEY,
    career_id INT REFERENCES careers(career_id) ON DELETE CASCADE,
    factor_id INT REFERENCES factors(factor_id),
    weight NUMERIC(3,2)
);

-- =========================
-- SKILLS
-- =========================

CREATE TABLE skills (
    skill_id INT IDENTITY PRIMARY KEY,
    name VARCHAR(255),
    type VARCHAR(50)
);

CREATE TABLE career_skills (
    id INT IDENTITY PRIMARY KEY,
    career_id INT REFERENCES careers(career_id) ON DELETE CASCADE,
    skill_id INT REFERENCES skills(skill_id),
    weight NUMERIC(3,2) DEFAULT 1.0
);

-- =========================
-- INDEX
-- =========================

CREATE INDEX idx_user_answers_user ON user_answers(user_id);
CREATE INDEX idx_career_skills_career ON career_skills(career_id);


INSERT INTO factor_types (name) VALUES
('Trait'),
('Ability'),
('Interest');
INSERT INTO factors (name, type_id) VALUES
('Introvert', 1),
('Extrovert', 1),
('Thinking', 1),
('Feeling', 1),
('Judging', 1),
('Perceiving', 1);

-- ABILITIES
INSERT INTO factors (name, type_id) VALUES
('Analytical Thinking', 2),
('Problem Solving', 2),
('Creativity', 2);

-- INTERESTS (RIASEC)
INSERT INTO factors (name, type_id) VALUES
('Investigative', 3),
('Artistic', 3),
('Social', 3),
('Enterprising', 3),
('Conventional', 3);

SET IDENTITY_INSERT questions ON;

-- Q1
INSERT INTO questions (question_id, content, dimension) VALUES (1, 'You enjoy group activities more than spending time alone', 'MBTI');
INSERT INTO question_factors (question_id, factor_id, weight) VALUES (1, 2, 1.0); -- Extrovert

-- Q2
INSERT INTO questions (question_id, content, dimension) VALUES (2, 'You prefer quiet environments to recharge energy', 'MBTI');
INSERT INTO question_factors (question_id, factor_id, weight) VALUES (2, 1, 1.0); -- Introvert

-- Q3
INSERT INTO questions (question_id, content, dimension) VALUES (3, 'You make decisions based on logic rather than emotions', 'MBTI');
INSERT INTO question_factors (question_id, factor_id, weight) VALUES (3, 3, 1.0); -- Thinking

-- Q4
INSERT INTO questions (question_id, content, dimension) VALUES (4, 'You consider people’s feelings before making decisions', 'MBTI');
INSERT INTO question_factors (question_id, factor_id, weight) VALUES (4, 4, 1.0); -- Feeling

-- Q5
INSERT INTO questions (question_id, content, dimension) VALUES (5, 'You like planning everything in advance', 'MBTI');
INSERT INTO question_factors (question_id, factor_id, weight) VALUES (5, 5, 1.0); -- Judging

-- Q6
INSERT INTO questions (question_id, content, dimension) VALUES (6, 'You prefer being flexible rather than sticking to plans', 'MBTI');
INSERT INTO question_factors (question_id, factor_id, weight) VALUES (6, 6, 1.0); -- Perceiving

-- Q7–20
INSERT INTO questions (question_id, content, dimension) VALUES
(7, 'You feel energized after social events', 'MBTI'),
(8, 'You enjoy working independently', 'MBTI'),
(9, 'You rely on facts more than intuition', 'MBTI'),
(10, 'You often follow your heart', 'MBTI'),
(11, 'You prefer structured schedules', 'MBTI'),
(12, 'You enjoy spontaneous decisions', 'MBTI'),
(13, 'You like discussing ideas with others', 'MBTI'),
(14, 'You prefer reading or solo activities', 'MBTI'),
(15, 'You analyze problems deeply', 'MBTI'),
(16, 'You empathize easily with others', 'MBTI'),
(17, 'You stick to deadlines strictly', 'MBTI'),
(18, 'You adapt quickly to changes', 'MBTI'),
(19, 'You enjoy teamwork', 'MBTI'),
(20, 'You prefer working alone', 'MBTI');
INSERT INTO question_factors (question_id, factor_id, weight) VALUES
-- Q7: energized after social events → Extrovert
(7, 2, 1.0),

-- Q8: working independently → Introvert
(8, 1, 1.0),

-- Q9: facts > intuition → Thinking
(9, 3, 1.0),

-- Q10: follow your heart → Feeling
(10, 4, 1.0),

-- Q11: structured schedules → Judging
(11, 5, 1.0),

-- Q12: spontaneous → Perceiving
(12, 6, 1.0),

-- Q13: discussing ideas → Extrovert
(13, 2, 1.0),

-- Q14: solo activities → Introvert
(14, 1, 1.0),

-- Q15: analyze deeply → Thinking
(15, 3, 1.0),

-- Q16: empathize → Feeling
(16, 4, 1.0),

-- Q17: strict deadlines → Judging
(17, 5, 1.0),

-- Q18: adapt to change → Perceiving
(18, 6, 1.0),

-- Q19: teamwork → Extrovert
(19, 2, 1.0),

-- Q20: working alone → Introvert
(20, 1, 1.0);
INSERT INTO questions (question_id, content, dimension) VALUES
(21, 'You enjoy solving complex problems', 'LOGIC'),
(22, 'You can quickly identify patterns', 'LOGIC'),
(23, 'You like analyzing data', 'LOGIC'),
(24, 'You think critically before acting', 'LOGIC'),
(25, 'You break problems into smaller parts', 'LOGIC'),
(26, 'You enjoy logical puzzles', 'LOGIC'),
(27, 'You can reason through difficult situations', 'LOGIC'),
(28, 'You like math challenges', 'LOGIC'),
(29, 'You evaluate multiple solutions before deciding', 'LOGIC'),
(30, 'You enjoy debugging problems', 'LOGIC'),
(31, 'You are good at spotting errors', 'LOGIC'),
(32, 'You can think abstractly', 'LOGIC'),
(33, 'You enjoy learning new concepts', 'LOGIC'),
(34, 'You like problem-solving competitions', 'LOGIC'),
(35, 'You think step-by-step', 'LOGIC');
INSERT INTO question_factors (question_id, factor_id, weight) VALUES
(21, 7, 1.0), -- Analytical Thinking
(22, 7, 1.0),
(23, 7, 1.0),
(24, 8, 1.0),
(25, 8, 1.0),
(26, 8, 1.0),
(27, 8, 1.0),
(28, 7, 1.0),
(29, 8, 1.0),
(30, 8, 1.0),
(31, 7, 1.0),
(32, 7, 1.0),
(33, 7, 1.0),
(34, 8, 1.0),
(35, 8, 1.0);
INSERT INTO questions (question_id, content, dimension) VALUES
(36, 'You enjoy scientific research', 'INTEREST'),
(37, 'You like creating art or design', 'INTEREST'),
(38, 'You enjoy helping others', 'INTEREST'),
(39, 'You like leading teams', 'INTEREST'),
(40, 'You enjoy organizing data', 'INTEREST'),
(41, 'You enjoy experimenting', 'INTEREST'),
(42, 'You like drawing or music', 'INTEREST'),
(43, 'You enjoy teaching others', 'INTEREST'),
(44, 'You like business ideas', 'INTEREST'),
(45, 'You enjoy working with numbers', 'INTEREST'),
(46, 'You enjoy exploring new theories', 'INTEREST'),
(47, 'You enjoy creative writing', 'INTEREST'),
(48, 'You like volunteering', 'INTEREST'),
(49, 'You enjoy persuading people', 'INTEREST'),
(50, 'You enjoy organizing systems', 'INTEREST');
INSERT INTO question_factors (question_id, factor_id, weight) VALUES
(36, 10, 1.0), -- Investigative
(37, 11, 1.0), -- Artistic
(38, 12, 1.0), -- Social
(39, 13, 1.0), -- Enterprising
(40, 14, 1.0), -- Conventional
(41, 10, 1.0),
(42, 11, 1.0),
(43, 12, 1.0),
(44, 13, 1.0),
(45, 14, 1.0),
(46, 10, 1.0),
(47, 11, 1.0),
(48, 12, 1.0),
(49, 13, 1.0),
(50, 14, 1.0);

SET IDENTITY_INSERT questions OFF;

INSERT INTO choices (question_id, content, score_value)
SELECT q.question_id, c.content, c.value
FROM questions q,
(VALUES
('Strongly Disagree',1),
('Disagree',2),
('Neutral',3),
('Agree',4),
('Strongly Agree',5)
) AS c(content,value);

SET IDENTITY_INSERT careers ON;

INSERT INTO careers (career_id, name, description) VALUES
(1, 'Software Engineer', 'Develops software applications'),
(2, 'Data Analyst', 'Analyzes and interprets data'),
(3, 'UI/UX Designer', 'Designs user interfaces and experiences'),
(4, 'Digital Marketer', 'Handles online marketing strategies'),
(5, 'Business Analyst', 'Analyzes business needs and solutions'),

(6, 'Data Scientist', 'Builds predictive models using data'),
(7, 'AI Engineer', 'Develops artificial intelligence systems'),
(8, 'Cybersecurity Specialist', 'Protects systems from cyber threats'),
(9, 'Game Developer', 'Develops video games'),
(10, 'Mobile App Developer', 'Builds mobile applications'),

(11, 'Web Developer', 'Develops websites and web apps'),
(12, 'System Administrator', 'Manages IT systems and infrastructure'),
(13, 'DevOps Engineer', 'Handles CI/CD and system deployment'),
(14, 'Cloud Engineer', 'Works with cloud platforms'),
(15, 'Database Administrator', 'Manages databases'),

(16, 'Graphic Designer', 'Creates visual content'),
(17, 'Content Creator', 'Produces digital content'),
(18, 'Video Editor', 'Edits video content'),
(19, 'Photographer', 'Captures professional photos'),
(20, 'Animator', 'Creates animations'),

(21, 'Teacher', 'Educates students'),
(22, 'Psychologist', 'Studies human behavior'),
(23, 'Doctor', 'Provides medical care'),
(24, 'Nurse', 'Assists in healthcare'),
(25, 'Social Worker', 'Helps communities'),

(26, 'Entrepreneur', 'Starts and manages businesses'),
(27, 'Sales Executive', 'Handles sales and client relationships'),
(28, 'HR Specialist', 'Manages human resources'),
(29, 'Financial Analyst', 'Analyzes financial data'),
(30, 'Accountant', 'Manages financial records');

INSERT INTO career_factors (career_id, factor_id, weight) VALUES

-- 1 Software Engineer
(1,1,0.7),(1,3,0.9),(1,5,0.6),(1,7,0.9),(1,8,0.9),(1,10,0.8),(1,14,0.5),

-- 2 Data Analyst
(2,1,0.6),(2,3,0.9),(2,5,0.7),(2,7,0.95),(2,8,0.85),(2,10,0.9),(2,14,0.8),

-- 3 UI/UX Designer
(3,2,0.6),(3,4,0.7),(3,6,0.7),(3,9,0.95),(3,11,0.9),(3,12,0.6),

-- 4 Digital Marketer
(4,2,0.8),(4,4,0.7),(4,6,0.7),(4,9,0.8),(4,12,0.8),(4,13,0.9),

-- 5 Business Analyst
(5,2,0.6),(5,3,0.85),(5,5,0.7),(5,7,0.85),(5,8,0.8),(5,12,0.7),(5,13,0.75),(5,14,0.6),

-- 6 Data Scientist
(6,1,0.7),(6,3,0.95),(6,5,0.6),(6,7,0.95),(6,8,0.9),(6,10,0.95),

-- 7 AI Engineer
(7,1,0.7),(7,3,0.95),(7,5,0.6),(7,7,0.95),(7,8,0.95),(7,10,0.9),

-- 8 Cybersecurity Specialist
(8,1,0.7),(8,3,0.9),(8,5,0.7),(8,7,0.9),(8,8,0.85),(8,14,0.8),

-- 9 Game Developer
(9,1,0.6),(9,3,0.8),(9,6,0.7),(9,8,0.85),(9,9,0.9),(9,11,0.7),

-- 10 Mobile App Developer
(10,1,0.6),(10,3,0.85),(10,5,0.6),(10,7,0.85),(10,8,0.85),(10,10,0.7),

-- 11 Web Developer
(11,1,0.6),(11,3,0.85),(11,5,0.6),(11,7,0.85),(11,8,0.8),(11,10,0.7),

-- 12 System Administrator
(12,1,0.7),(12,3,0.85),(12,5,0.8),(12,7,0.8),(12,8,0.75),(12,14,0.9),

-- 13 DevOps Engineer
(13,1,0.7),(13,3,0.9),(13,5,0.7),(13,7,0.9),(13,8,0.85),(13,14,0.7),

-- 14 Cloud Engineer
(14,1,0.7),(14,3,0.9),(14,5,0.7),(14,7,0.9),(14,8,0.85),(14,10,0.8),

-- 15 Database Administrator
(15,1,0.7),(15,3,0.9),(15,5,0.8),(15,7,0.9),(15,14,0.95),

-- 16 Graphic Designer
(16,2,0.6),(16,4,0.6),(16,6,0.7),(16,9,0.95),(16,11,0.95),

-- 17 Content Creator
(17,2,0.7),(17,4,0.7),(17,6,0.7),(17,9,0.9),(17,11,0.8),(17,13,0.7),

-- 18 Video Editor
(18,1,0.5),(18,6,0.7),(18,9,0.9),(18,11,0.9),

-- 19 Photographer
(19,1,0.5),(19,6,0.7),(19,9,0.9),(19,11,0.95),

-- 20 Animator
(20,1,0.5),(20,6,0.7),(20,9,0.95),(20,11,0.95),

-- 21 Teacher
(21,2,0.7),(21,4,0.9),(21,5,0.6),(21,12,0.95),

-- 22 Psychologist
(22,1,0.6),(22,4,0.9),(22,7,0.7),(22,12,0.95),

-- 23 Doctor
(23,2,0.6),(23,3,0.85),(23,4,0.8),(23,8,0.9),(23,12,0.8),

-- 24 Nurse
(24,2,0.7),(24,4,0.95),(24,5,0.6),(24,12,0.95),

-- 25 Social Worker
(25,2,0.7),(25,4,0.95),(25,6,0.7),(25,12,0.95),

-- 26 Entrepreneur
(26,2,0.9),(26,3,0.7),(26,6,0.8),(26,13,0.95),

-- 27 Sales Executive
(27,2,0.9),(27,4,0.7),(27,6,0.8),(27,13,0.95),

-- 28 HR Specialist
(28,2,0.7),(28,4,0.9),(28,5,0.6),(28,12,0.9),

-- 29 Financial Analyst
(29,1,0.6),(29,3,0.9),(29,5,0.7),(29,7,0.9),(29,14,0.9),

-- 30 Accountant
(30,1,0.7),(30,3,0.85),(30,5,0.8),(30,14,0.95);

SET IDENTITY_INSERT careers OFF;