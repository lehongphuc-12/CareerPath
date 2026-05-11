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
    image VARCHAR(255), 
    date_of_birth DATE,
    gender_id INT REFERENCES genders(gender_id),
    school NVARCHAR(255),
    grade INT,
    bio NVARCHAR(MAX),
    address NVARCHAR(255)
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
    name NVARCHAR(50)
);

CREATE TABLE factors (
    factor_id INT IDENTITY PRIMARY KEY,
    name NVARCHAR(100),
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
    career_id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(255),
    description NVARCHAR(MAX),
    min_salary NUMERIC(12,2),
    max_salary NUMERIC(12,2),
    demand_level INT,
    image VARCHAR(255)
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
(N'Tính cách'),
(N'Năng lực'),
(N'Sở thích');

INSERT INTO factors (name, type_id) VALUES
(N'Hướng nội', 1),
(N'Hướng ngoại', 1),
(N'Lý trí', 1),
(N'Cảm xúc', 1),
(N'Nguyên tắc', 1),
(N'Linh hoạt', 1);

-- NĂNG LỰC
INSERT INTO factors (name, type_id) VALUES
(N'Tư duy phân tích', 2),
(N'Giải quyết vấn đề', 2),
(N'Sáng tạo', 2);

-- SỞ THÍCH (RIASEC)
INSERT INTO factors (name, type_id) VALUES
(N'Nghiên cứu', 3),
(N'Nghệ thuật', 3),
(N'Xã hội', 3),
(N'Kinh doanh', 3),
(N'Hành chính', 3);
SET IDENTITY_INSERT questions ON;

-- Q1
INSERT INTO questions (question_id, content, dimension) 
VALUES (1, N'Bạn thích tham gia các hoạt động nhóm hơn là ở một mình', 'MBTI');
INSERT INTO question_factors (question_id, factor_id, weight) 
VALUES (1, 2, 1.0); -- Hướng ngoại

-- Q2
INSERT INTO questions (question_id, content, dimension) 
VALUES (2, N'Bạn thích môi trường yên tĩnh để nạp lại năng lượng', 'MBTI');
INSERT INTO question_factors (question_id, factor_id, weight) 
VALUES (2, 1, 1.0); -- Hướng nội

-- Q3
INSERT INTO questions (question_id, content, dimension) 
VALUES (3, N'Bạn đưa ra quyết định dựa trên lý trí hơn là cảm xúc', 'MBTI');
INSERT INTO question_factors (question_id, factor_id, weight) 
VALUES (3, 3, 1.0); -- Lý trí

-- Q4
INSERT INTO questions (question_id, content, dimension) 
VALUES (4, N'Bạn cân nhắc cảm xúc của người khác trước khi đưa ra quyết định', 'MBTI');
INSERT INTO question_factors (question_id, factor_id, weight) 
VALUES (4, 4, 1.0); -- Cảm xúc

-- Q5
INSERT INTO questions (question_id, content, dimension) 
VALUES (5, N'Bạn thích lập kế hoạch mọi thứ từ trước', 'MBTI');
INSERT INTO question_factors (question_id, factor_id, weight) 
VALUES (5, 5, 1.0); -- Nguyên tắc

-- Q6
INSERT INTO questions (question_id, content, dimension) 
VALUES (6, N'Bạn thích linh hoạt hơn là tuân theo kế hoạch cố định', 'MBTI');
INSERT INTO question_factors (question_id, factor_id, weight) 
VALUES (6, 6, 1.0); -- Linh hoạt
-- Q7–20
INSERT INTO questions (question_id, content, dimension) VALUES
(7, N'Bạn cảm thấy năng lượng sau các sự kiện xã hội', 'MBTI'),
(8, N'Bạn thích làm việc một mình', 'MBTI'),
(9, N'Bạn dựa trên sự thật hơn là trực giác', 'MBTI'),
(10, N'Bạn thường lắng nghe trái tim của mình', 'MBTI'),
(11, N'Bạn ưa thích lịch trình có cấu trúc', 'MBTI'),
(12, N'Bạn thích ra quyết định bất ngờ', 'MBTI'),
(13, N'Bạn thích thảo luận ý tưởng với người khác', 'MBTI'),
(14, N'Bạn ưa thích đọc sách hoặc hoạt động một mình', 'MBTI'),
(15, N'Bạn phân tích vấn đề một cách sâu sắc', 'MBTI'),
(16, N'Bạn dễ dàng đồng cảm với người khác', 'MBTI'),
(17, N'Bạn nghiêm túc với các hạn chót', 'MBTI'),
(18, N'Bạn thích nghi nhanh với những thay đổi', 'MBTI'),
(19, N'Bạn thích làm việc nhóm', 'MBTI'),
(20, N'Bạn ưa thích làm việc một mình', 'MBTI');
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
(21, N'Bạn thích giải quyết các vấn đề phức tạp', 'LOGIC'),
(22, N'Bạn có thể nhanh chóng xác định các mẫu', 'LOGIC'),
(23, N'Bạn thích phân tích dữ liệu', 'LOGIC'),
(24, N'Bạn suy nghĩ một cách phê phán trước khi hành động', 'LOGIC'),
(25, N'Bạn chia nhỏ các vấn đề thành các phần nhỏ hơn', 'LOGIC'),
(26, N'Bạn thích các trò chơi logic', 'LOGIC'),
(27, N'Bạn có thể lý luận qua các tình huống khó khăn', 'LOGIC'),
(28, N'Bạn thích thách thức toán học', 'LOGIC'),
(29, N'Bạn đánh giá nhiều giải pháp trước khi quyết định', 'LOGIC'),
(30, N'Bạn thích sửa lỗi vấn đề', 'LOGIC'),
(31, N'Bạn giỏi trong việc phát hiện lỗi', 'LOGIC'),
(32, N'Bạn có thể suy nghĩ trừu tượng', 'LOGIC'),
(33, N'Bạn thích học các khái niệm mới', 'LOGIC'),
(34, N'Bạn thích tham gia các cuộc thi giải quyết vấn đề', 'LOGIC'),
(35, N'Bạn suy nghĩ theo từng bước', 'LOGIC');
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
(36, N'Bạn thích nghiên cứu khoa học', 'INTEREST'),
(37, N'Bạn thích sáng tạo nghệ thuật hoặc thiết kế', 'INTEREST'),
(38, N'Bạn thích giúp đỡ người khác', 'INTEREST'),
(39, N'Bạn thích dẫn dắt nhóm', 'INTEREST'),
(40, N'Bạn thích tổ chức dữ liệu', 'INTEREST'),
(41, N'Bạn thích thử nghiệm', 'INTEREST'),
(42, N'Bạn thích vẽ tranh hoặc âm nhạc', 'INTEREST'),
(43, N'Bạn thích giảng dạy người khác', 'INTEREST'),
(44, N'Bạn thích ý tưởng kinh doanh', 'INTEREST'),
(45, N'Bạn thích làm việc với số liệu', 'INTEREST'),
(46, N'Bạn thích khám phá các lý thuyết mới', 'INTEREST'),
(47, N'Bạn thích viết sáng tạo', 'INTEREST'),
(48, N'Bạn thích tình nguyện', 'INTEREST'),
(49, N'Bạn thích thuyết phục người khác', 'INTEREST'),
(50, N'Bạn thích tổ chức các hệ thống', 'INTEREST');
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
(N'Hoàn toàn không đồng ý',1),
(N'Không đồng ý',2),
(N'Trung lập',3),
(N'Đồng ý',4),
(N'Hoàn toàn đồng ý',5)
) AS c(content,value);

SET IDENTITY_INSERT careers ON;

INSERT INTO careers (name, description, min_salary, max_salary, demand_level, image) VALUES
(N'Kỹ sư phần mềm', N'Phát triển các ứng dụng phần mềm', 12000000, 35000000, 5, 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop'),
(N'Chuyên viên phân tích dữ liệu', N'Phân tích và diễn giải dữ liệu', 10000000, 30000000, 5, 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop'),
(N'Nhà thiết kế UI/UX', N'Thiết kế giao diện và trải nghiệm người dùng', 9000000, 25000000, 4, 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&auto=format&fit=crop'),
(N'Chuyên viên Marketing số', N'Triển khai chiến lược marketing trực tuyến', 8000000, 25000000, 4, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop'),
(N'Chuyên viên phân tích nghiệp vụ', N'Phân tích nhu cầu và giải pháp kinh doanh', 12000000, 28000000, 4, 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop'),

(N'Nhà khoa học dữ liệu', N'Xây dựng mô hình dự đoán từ dữ liệu', 15000000, 40000000, 5, 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?w=800&auto=format&fit=crop'),
(N'Kỹ sư AI', N'Phát triển hệ thống trí tuệ nhân tạo', 18000000, 50000000, 5, 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop'),
(N'Chuyên gia an ninh mạng', N'Bảo vệ hệ thống khỏi các mối đe dọa mạng', 15000000, 35000000, 5, 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop'),
(N'Lập trình viên game', N'Phát triển trò chơi điện tử', 10000000, 25000000, 4, 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop'),
(N'Lập trình viên ứng dụng di động', N'Xây dựng ứng dụng trên điện thoại', 12000000, 30000000, 5, 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop'),

(N'Lập trình viên web', N'Phát triển website và ứng dụng web', 10000000, 28000000, 5, 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop'),
(N'Quản trị hệ thống', N'Quản lý hệ thống và hạ tầng CNTT', 9000000, 22000000, 4, 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop'),
(N'Kỹ sư DevOps', N'Quản lý CI/CD và triển khai hệ thống', 18000000, 40000000, 5, 'https://images.unsplash.com/photo-1605902711622-cfb43c4437d1?w=800&auto=format&fit=crop'),
(N'Kỹ sư Cloud', N'Làm việc với nền tảng điện toán đám mây', 18000000, 42000000, 5, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop'),
(N'Quản trị cơ sở dữ liệu', N'Quản lý và tối ưu cơ sở dữ liệu', 12000000, 30000000, 4, 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop'),

(N'Nhà thiết kế đồ họa', N'Tạo nội dung hình ảnh', 7000000, 18000000, 3, 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop'),
(N'Nhà sáng tạo nội dung', N'Sản xuất nội dung số', 7000000, 20000000, 4, 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&auto=format&fit=crop'),
(N'Biên tập video', N'Chỉnh sửa và dựng video', 8000000, 20000000, 4, 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop'),
(N'Nhiếp ảnh gia', N'Chụp ảnh chuyên nghiệp', 7000000, 18000000, 3, 'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=800&auto=format&fit=crop'),
(N'Họa sĩ hoạt hình', N'Tạo hoạt hình và chuyển động', 9000000, 22000000, 3, 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop'),

(N'Giáo viên', N'Giảng dạy và giáo dục học sinh', 7000000, 15000000, 3, 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&auto=format&fit=crop'),
(N'Nhà tâm lý học', N'Nghiên cứu hành vi con người', 10000000, 25000000, 3, 'https://images.unsplash.com/photo-1573497161161-c3b6c64b07c2?w=800&auto=format&fit=crop'),
(N'Bác sĩ', N'Chăm sóc và điều trị bệnh nhân', 20000000, 60000000, 5, 'https://images.unsplash.com/photo-1580281657527-47c1f89a0a93?w=800&auto=format&fit=crop'),
(N'Y tá', N'Hỗ trợ chăm sóc sức khỏe', 8000000, 18000000, 4, 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&auto=format&fit=crop'),
(N'Nhân viên công tác xã hội', N'Hỗ trợ cộng đồng', 6000000, 15000000, 3, 'https://images.unsplash.com/photo-1593113630400-ea4288922497?w=800&auto=format&fit=crop'),

(N'Doanh nhân', N'Khởi nghiệp và điều hành doanh nghiệp', 0, 100000000, 5, 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop'),
(N'Nhân viên kinh doanh', N'Quản lý bán hàng và khách hàng', 8000000, 30000000, 5, 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800&auto=format&fit=crop'),
(N'Chuyên viên nhân sự', N'Quản lý nguồn nhân lực', 10000000, 25000000, 4, 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&auto=format&fit=crop'),
(N'Chuyên viên phân tích tài chính', N'Phân tích dữ liệu tài chính', 15000000, 40000000, 5, 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop'),
(N'Kế toán', N'Quản lý sổ sách tài chính', 8000000, 20000000, 4, 'https://images.unsplash.com/photo-1554224154-26032fced8bd?w=800&auto=format&fit=crop');

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

CREATE TABLE blogs (
    blog_id INT IDENTITY PRIMARY KEY,

    title NVARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE, -- dùng cho URL SEO

    content NVARCHAR(MAX) NOT NULL,
    thumbnail VARCHAR(255),

    author_id INT REFERENCES users(user_id), -- người viết

    status VARCHAR(50) DEFAULT 'draft', 
    -- draft | published | archived

    view_count INT DEFAULT 0,
    like_count INT DEFAULT 0,

    is_featured BIT DEFAULT 0, -- bài nổi bật

    published_at DATETIME2,
    created_at DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME,
    is_deleted BIT DEFAULT 0,
    deleted_at DATETIME2,
    language VARCHAR(10) DEFAULT 'vi',
);
CREATE TABLE blog_categories (
    category_id INT IDENTITY PRIMARY KEY,
    name NVARCHAR(100),
    slug VARCHAR(100) UNIQUE
);
CREATE TABLE blog_category_map (
    id INT IDENTITY PRIMARY KEY,
    blog_id INT REFERENCES blogs(blog_id) ON DELETE CASCADE,
    category_id INT REFERENCES blog_categories(category_id)
);
CREATE TABLE blog_comments (
    comment_id INT IDENTITY PRIMARY KEY,
    blog_id INT REFERENCES blogs(blog_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id),

    content NVARCHAR(MAX),
    parent_id INT, -- reply comment

    created_at DATETIME2 DEFAULT CURRENT_TIMESTAMP
);
