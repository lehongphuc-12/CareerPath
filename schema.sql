create database CareerPath;
use CareerPath
-- =========================
-- ROLES / GENDERS / TEST TYPES
-- =========================

CREATE TABLE roles (
    role_id INT IDENTITY PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE genders (
    gender_id INT IDENTITY PRIMARY KEY,
    name VARCHAR(20)
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
    password_hash NVARCHAR(255) NULL,
    full_name NVARCHAR(255),

    role_id INT REFERENCES roles(role_id),

    created_at DATETIME2 DEFAULT CURRENT_TIMESTAMP
);

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

    name NVARCHAR(100),
    description NVARCHAR(MAX),

    type_id INT REFERENCES test_types(type_id),

    created_at DATETIME2 DEFAULT CURRENT_TIMESTAMP
);

-- EI / SN / TF / JP
CREATE TABLE test_dimensions (
    dimension_id INT IDENTITY PRIMARY KEY,

    test_id INT REFERENCES tests(test_id) ON DELETE CASCADE,

    code VARCHAR(10) NOT NULL, -- EI, SN, TF, JP
    name NVARCHAR(100),

    positive_side CHAR(1), -- E,S,T,J
    negative_side CHAR(1)  -- I,N,F,P
);

CREATE TABLE questions (
    question_id INT IDENTITY PRIMARY KEY,

    test_id INT REFERENCES tests(test_id) ON DELETE CASCADE,

    dimension_id INT REFERENCES test_dimensions(dimension_id),

    content NVARCHAR(MAX) NOT NULL,

    -- E/I/S/N/T/F/J/P
    direction CHAR(1) NOT NULL,

    question_order INT
);

CREATE TABLE choices (
    choice_id INT IDENTITY PRIMARY KEY,

    question_id INT REFERENCES questions(question_id) ON DELETE CASCADE,

    content NVARCHAR(255),

    score_value INT NOT NULL,

    choice_order INT
);

CREATE TABLE user_answers (
    answer_id INT IDENTITY PRIMARY KEY,

    user_id INT REFERENCES users(user_id),

    question_id INT REFERENCES questions(question_id),

    choice_id INT REFERENCES choices(choice_id),

    answer_score INT,

    created_at DATETIME2 DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT unique_user_question UNIQUE (user_id, question_id)
);

-- =========================
-- CAREERS
-- =========================

CREATE TABLE careers (
    career_id INT IDENTITY PRIMARY KEY,

    name NVARCHAR(255) NOT NULL,

    description NVARCHAR(MAX),

    min_salary DECIMAL(12,2),
    max_salary DECIMAL(12,2),

    demand_level INT, -- 1 -> 10

    image VARCHAR(255),

    created_at DATETIME2 DEFAULT CURRENT_TIMESTAMP
);

-- career phù hợp MBTI nào
CREATE TABLE career_mbti_matches (
    id INT IDENTITY PRIMARY KEY,

    career_id INT REFERENCES careers(career_id) ON DELETE CASCADE,

    mbti_type VARCHAR(4) NOT NULL,

    compatibility_score INT DEFAULT 0
);

CREATE TABLE skills (
    skill_id INT IDENTITY PRIMARY KEY,

    name NVARCHAR(100) NOT NULL
);

CREATE TABLE career_skills (
    id INT IDENTITY PRIMARY KEY,

    career_id INT REFERENCES careers(career_id) ON DELETE CASCADE,

    skill_id INT REFERENCES skills(skill_id),

    importance_level INT DEFAULT 1
);

-- =========================
-- BLOGS
-- =========================

CREATE TABLE blogs (
    blog_id INT IDENTITY PRIMARY KEY,

    title NVARCHAR(255) NOT NULL,

    slug VARCHAR(255) UNIQUE,

    content NVARCHAR(MAX) NOT NULL,

    thumbnail VARCHAR(255),

    author_id INT REFERENCES users(user_id),

    status VARCHAR(50) DEFAULT 'draft',

    view_count INT DEFAULT 0,
    like_count INT DEFAULT 0,

    is_featured BIT DEFAULT 0,

    published_at DATETIME2,

    created_at DATETIME2 DEFAULT CURRENT_TIMESTAMP,

    updated_at DATETIME2,

    is_deleted BIT DEFAULT 0,

    deleted_at DATETIME2,

    language VARCHAR(10) DEFAULT 'vi'
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

    parent_id INT REFERENCES blog_comments(comment_id),

    created_at DATETIME2 DEFAULT CURRENT_TIMESTAMP
);
-- ==========================================
-- CHAT SYSTEM (1:1 & Group Chat Extensible)
-- ==========================================

-- 1. Bảng phòng chat (Mỗi cuộc hội thoại 1:1 là một phòng chat)
CREATE TABLE chat_rooms (
    room_id INT IDENTITY PRIMARY KEY,
    name NVARCHAR(255) NULL,                     -- Tên phòng (thường NULL cho chat 1:1, có tên nếu là chat nhóm)
    is_group BIT DEFAULT 0,                      -- 0: Chat 1:1, 1: Chat nhóm
    created_at DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME2 DEFAULT CURRENT_TIMESTAMP -- Cập nhật khi có tin nhắn mới để sắp xếp danh sách phòng chat
);

-- 2. Bảng liên kết người dùng và phòng chat (Một phòng chat 1:1 sẽ có đúng 2 bản ghi cho 2 users tham gia)
CREATE TABLE chat_room_participants (
    id INT IDENTITY PRIMARY KEY,
    room_id INT REFERENCES chat_rooms(room_id) ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    joined_at DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    last_read_at DATETIME2 DEFAULT CURRENT_TIMESTAMP -- Dùng để đếm số tin nhắn chưa đọc (unread messages)
    
    CONSTRAINT unique_room_user UNIQUE (room_id, user_id)
);

-- 3. Bảng lưu trữ chi tiết các tin nhắn trong phòng chat
CREATE TABLE chat_messages (
    message_id INT IDENTITY PRIMARY KEY,
    room_id INT REFERENCES chat_rooms(room_id) ON DELETE CASCADE,
    sender_id INT REFERENCES users(user_id),
    content NVARCHAR(MAX) NOT NULL,
    created_at DATETIME2 DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- INDEXES TO OPTIMIZE PERFORMANCE
-- ==========================================

-- Tối ưu hóa việc lấy lịch sử tin nhắn của một phòng chat theo thời gian gần nhất
CREATE INDEX idx_chat_messages_room 
ON chat_messages(room_id, created_at DESC);

-- Tối ưu hóa việc tìm danh sách phòng chat mà một User đang tham gia
CREATE INDEX idx_chat_room_participants_user 
ON chat_room_participants(user_id);


-- =========================
-- INDEXES
-- =========================

CREATE INDEX idx_user_answers_user
ON user_answers(user_id);

CREATE INDEX idx_questions_dimension
ON questions(dimension_id);

CREATE INDEX idx_career_skills_career
ON career_skills(career_id);

CREATE INDEX idx_career_mbti
ON career_mbti_matches(mbti_type);