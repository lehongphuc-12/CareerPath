-- =========================
-- ROLES
-- =========================

INSERT INTO roles(name)
VALUES 
('Admin'),
('User'),
('Mentor');

-- =========================
-- GENDERS
-- =========================

INSERT INTO genders(name)
VALUES
('Male'),
('Female'),
('Other');

-- =========================
-- TEST TYPES
-- =========================

INSERT INTO test_types(name)
VALUES
('MBTI');

-- =========================
-- TEST
-- =========================

INSERT INTO tests(name, description, type_id)
VALUES
(
    N'MBTI Personality Test',
    N'Bài kiểm tra tính cách MBTI',
    1
);

-- =========================
-- TEST DIMENSIONS
-- =========================

INSERT INTO test_dimensions
(
    test_id,
    code,
    name,
    positive_side,
    negative_side
)
VALUES
(1, 'EI', 'Extraversion vs Introversion', 'E', 'I'),
(1, 'SN', 'Sensing vs Intuition', 'S', 'N'),
(1, 'TF', 'Thinking vs Feeling', 'T', 'F'),
(1, 'JP', 'Judging vs Perceiving', 'J', 'P');

-- =========================
-- CHOICES
-- dùng chung:
-- 1 = Hoàn toàn không đồng ý
-- 2 = Không đồng ý
-- 3 = Trung lập
-- 4 = Đồng ý
-- 5 = Hoàn toàn đồng ý
-- =========================

-- =========================
-- QUESTIONS
-- =========================

INSERT INTO questions
(test_id, dimension_id, content, direction, question_order)
VALUES

-- EI
(1, 1, N'Bạn thường xuyên kết bạn mới.', 'E', 1),
(1, 1, N'Bạn thấy kết nối hoặc quảng bá bản thân với người lạ là việc rất khó khăn.', 'I', 2),
(1, 1, N'Bạn cảm thấy khá thoải mái khi tiến tới và bắt chuyện với một ai đó mà bạn cho là thú vị.', 'E', 3),
(1, 1, N'Bạn thích tham gia vào các hoạt động theo nhóm.', 'E', 4),
(1, 1, N'Bạn thích những sở thích hoặc hoạt động riêng lẻ hơn là hoạt động nhóm.', 'I', 5),
(1, 1, N'Tại các buổi tụ họp xã giao, bạn thường đợi người khác giới thiệu bản thân trước.', 'I', 6),
(1, 1, N'Bạn thường thích ở cạnh người khác hơn là ở một mình.', 'E', 7),
(1, 1, N'Bạn bè của bạn sẽ mô tả bạn là người sôi nổi và hướng ngoại.', 'E', 8),
(1, 1, N'Bạn có thể dễ dàng kết nối với những người vừa gặp.', 'E', 9),

-- SN
(1, 2, N'Những ý tưởng phức tạp và mới lạ sẽ khiến bạn bị kích thích hơn những ý tưởng đơn giản và rõ ràng.', 'N', 10),
(1, 2, N'Bạn không quá hứng thú bàn luận về những cách lý giải một tác phẩm có tính sáng tạo.', 'S', 11),
(1, 2, N'Bạn thích thử nghiệm những cách tiếp cận mới và chưa qua thử nghiệm.', 'N', 12),
(1, 2, N'Bạn tích cực tìm kiếm những trải nghiệm và lĩnh vực kiến thức mới để khám phá.', 'N', 13),
(1, 2, N'Bạn thích tranh luận về những tình huống khó xử về mặt đạo đức.', 'N', 14),
(1, 2, N'Bạn thường thấy nhàm chán hoặc mất hứng thú khi cuộc thảo luận trở nên quá mang tính lý thuyết.', 'S', 15),
(1, 2, N'Bạn bị thu hút bởi nhiều hình thức thể hiện sự sáng tạo khác nhau, chẳng hạn như viết lách.', 'N', 16),
(1, 2, N'Bạn thích khám phá những ý tưởng và quan điểm không quen thuộc.', 'N', 17),

-- TF
(1, 3, N'Bạn thường cảm thấy bị thuyết phục bởi những điều gây được cảm xúc cho bạn hơn là những lập luận thực tế.', 'F', 18),
(1, 3, N'Bạn luôn điềm tĩnh, ngay cả khi đang gặp nhiều áp lực.', 'T', 19),
(1, 3, N'Với bạn, câu chuyện và cảm xúc của mọi người có ý nghĩa hơn so với các con số hoặc dữ liệu.', 'F', 20),
(1, 3, N'Khi xác định hướng hành động, bạn ưu tiên sự thật hơn cảm xúc của mọi người.', 'T', 21),
(1, 3, N'Bạn ưu tiên tế nhị hơn là hoàn toàn thành thật.', 'F', 22),
(1, 3, N'Bạn thiên về tính hiệu quả trong các quyết định, ngay cả khi điều đó có nghĩa là bỏ qua một số khía cạnh cảm xúc.', 'T', 23),
(1, 3, N'Khi bất đồng quan điểm, bạn ưu tiên việc chứng minh quan điểm của mình hơn là quan tâm đến cảm xúc của người khác.', 'T', 24),
(1, 3, N'Bạn không dễ bị lung lay bởi những tranh cãi mang tính cảm xúc.', 'T', 25),
(1, 3, N'Khi sự thật và cảm xúc xung đột với nhau, bạn thường muốn làm theo lời mách bảo của trái tim.', 'F', 26),
(1, 3, N'Bạn thường lựa chọn dựa trên sự thật khách quan hơn là ấn tượng về mặt cảm xúc.', 'T', 27),

-- JP
(1, 4, N'Không gian sống và làm việc của bạn sạch sẽ và ngăn nắp.', 'J', 28),
(1, 4, N'Bạn sắp xếp thứ tự ưu tiên và lên kế hoạch cho các nhiệm vụ một cách hiệu quả.', 'J', 29),
(1, 4, N'Bạn thích dùng các công cụ quản lý hỗ trợ như thời gian biểu hoặc danh sách.', 'J', 30),
(1, 4, N'Bạn thường để một ngày trôi qua mà không có bất kỳ lịch trình hay kế hoạch nào.', 'P', 31),
(1, 4, N'Bạn muốn hoàn thành các công việc cần xử lý trước khi cho phép bản thân được nghỉ ngơi.', 'J', 32),
(1, 4, N'Bạn thường dồn công việc để đến phút cuối mới làm.', 'P', 33),
(1, 4, N'Bạn cảm thấy khó duy trì lịch làm việc hoặc học tập nhất quán.', 'P', 34),
(1, 4, N'Bạn muốn mỗi ngày đều có một danh sách việc-cần-làm.', 'J', 35);

-- =========================
-- INSERT CHOICES
-- mỗi câu có 5 lựa chọn
-- =========================

DECLARE @i INT = 1;

WHILE @i <= 35
BEGIN

    INSERT INTO choices(question_id, content, score_value, choice_order)
    VALUES
    (@i, N'Hoàn toàn không đồng ý', 1, 1),
    (@i, N'Không đồng ý', 2, 2),
    (@i, N'Trung lập', 3, 3),
    (@i, N'Đồng ý', 4, 4),
    (@i, N'Hoàn toàn đồng ý', 5, 5);

    SET @i = @i + 1;

END;

INSERT INTO CareerCategories
(name, description, image)
VALUES
(N'Công nghệ thông tin', N'Các nghề liên quan đến phát triển phần mềm, dữ liệu và hạ tầng CNTT.', NULL),

(N'Kinh doanh - Quản trị', N'Các nghề về quản lý, vận hành và phát triển doanh nghiệp.', NULL),

(N'Tài chính - Ngân hàng', N'Các nghề về tài chính, đầu tư, kế toán và ngân hàng.', NULL),

(N'Marketing - Truyền thông', N'Các nghề về marketing, quảng cáo và xây dựng thương hiệu.', NULL),

(N'Kỹ thuật - Công nghiệp', N'Các nghề kỹ thuật trong sản xuất và công nghiệp.', NULL),

(N'Logistics - Chuỗi cung ứng', N'Các nghề liên quan đến vận chuyển và quản lý chuỗi cung ứng.', NULL),

(N'Y tế - Sức khỏe', N'Các nghề chăm sóc sức khỏe và y tế.', NULL),

(N'Giáo dục - Đào tạo', N'Các nghề giảng dạy và đào tạo.', NULL),

(N'Luật - Hành chính', N'Các nghề liên quan đến pháp luật và hành chính.', NULL),

(N'Thiết kế - Sáng tạo', N'Các nghề về thiết kế và sáng tạo nội dung.', NULL),

(N'Bất động sản - Dịch vụ', N'Các nghề về bất động sản và dịch vụ khách hàng.', NULL),

(N'Du lịch - Khách sạn - Hàng không', N'Các nghề trong lĩnh vực du lịch và hàng không.', NULL),

(N'Nông nghiệp Công nghệ cao', N'Các nghề ứng dụng công nghệ trong nông nghiệp.', NULL),

(N'Nghệ thuật - Giải trí', N'Các nghề trong lĩnh vực nghệ thuật và giải trí.', NULL),

(N'Khoa học - Công vụ', N'Các nghề nghiên cứu khoa học và khu vực công.', NULL);

INSERT INTO Careers
(category_id, name, description, min_salary, max_salary, demand_level, image)
VALUES

-- 1. Công nghệ thông tin
(1,N'Kỹ sư phần mềm',N'Phát triển và bảo trì phần mềm.',15000000,60000000,10,NULL),
(1,N'Frontend Developer',N'Phát triển giao diện người dùng.',15000000,50000000,10,NULL),
(1,N'Backend Developer',N'Phát triển hệ thống phía máy chủ.',15000000,60000000,10,NULL),
(1,N'Mobile Developer',N'Phát triển ứng dụng di động.',15000000,60000000,10,NULL),
(1,N'QA Engineer',N'Kiểm thử và đảm bảo chất lượng phần mềm.',12000000,40000000,9,NULL),
(1,N'Data Scientist',N'Phân tích dữ liệu và AI.',25000000,80000000,10,NULL),
(1,N'AI Engineer',N'Xây dựng hệ thống trí tuệ nhân tạo.',25000000,90000000,10,NULL),
(1,N'Cybersecurity Specialist',N'Bảo mật hệ thống và dữ liệu.',20000000,80000000,10,NULL),
(1,N'DevOps Engineer',N'Tự động hóa triển khai phần mềm.',20000000,80000000,10,NULL),
(1,N'Business Analyst',N'Phân tích yêu cầu nghiệp vụ.',18000000,60000000,9,NULL),

-- 2. Kinh doanh - Quản trị
(2,N'Giám đốc điều hành',N'Điều hành doanh nghiệp.',30000000,150000000,9,NULL),
(2,N'Quản lý Kinh doanh',N'Quản lý hoạt động kinh doanh.',15000000,60000000,8,NULL),
(2,N'Quản lý Nhân sự',N'Quản lý nguồn nhân lực.',12000000,45000000,8,NULL),
(2,N'Quản lý Vận hành',N'Điều phối hoạt động doanh nghiệp.',15000000,60000000,8,NULL),

-- 3. Tài chính - Ngân hàng
(3,N'Kế toán',N'Quản lý và ghi nhận tài chính.',10000000,35000000,8,NULL),
(3,N'Kiểm toán viên',N'Kiểm tra báo cáo tài chính.',12000000,45000000,8,NULL),
(3,N'Chuyên viên Tài chính',N'Phân tích tài chính doanh nghiệp.',15000000,50000000,8,NULL),
(3,N'Chuyên viên Phân tích Đầu tư',N'Đánh giá cơ hội đầu tư.',15000000,70000000,9,NULL),

-- 4. Marketing - Truyền thông
(4,N'Digital Marketing Specialist',N'Triển khai marketing số.',12000000,50000000,10,NULL),
(4,N'SEO Specialist',N'Tối ưu công cụ tìm kiếm.',10000000,35000000,8,NULL),
(4,N'Content Marketing Specialist',N'Sản xuất nội dung marketing.',10000000,35000000,8,NULL),
(4,N'Social Media Specialist',N'Quản lý mạng xã hội.',10000000,40000000,9,NULL),

-- 5. Kỹ thuật - Công nghiệp
(5,N'Kỹ sư Xây dựng',N'Thiết kế và giám sát công trình.',12000000,50000000,8,NULL),
(5,N'Kỹ sư Cơ khí',N'Thiết kế hệ thống cơ khí.',12000000,45000000,8,NULL),
(5,N'Kỹ sư Điện',N'Thiết kế hệ thống điện.',12000000,45000000,8,NULL),
(5,N'Kỹ sư Tự động hóa',N'Phát triển hệ thống tự động.',15000000,60000000,9,NULL),
(5,N'Kỹ sư Bán dẫn',N'Nghiên cứu và phát triển vi mạch.',25000000,100000000,10,NULL),

-- 6. Logistics - Chuỗi cung ứng
(6,N'Chuyên viên Logistics',N'Quản lý vận chuyển hàng hóa.',12000000,45000000,9,NULL),
(6,N'Chuyên viên Chuỗi cung ứng',N'Tối ưu chuỗi cung ứng.',15000000,50000000,9,NULL),
(6,N'Quản lý Kho vận',N'Điều hành kho hàng.',12000000,50000000,8,NULL),
(6,N'Chuyên viên Xuất nhập khẩu',N'Xử lý nghiệp vụ xuất nhập khẩu.',12000000,45000000,8,NULL),

-- 7. Y tế - Sức khỏe
(7,N'Bác sĩ Đa khoa',N'Khám và điều trị bệnh tổng quát.',20000000,80000000,10,NULL),
(7,N'Bác sĩ Chuyên khoa',N'Điều trị chuyên sâu.',30000000,150000000,10,NULL),
(7,N'Nha sĩ',N'Chăm sóc sức khỏe răng miệng.',25000000,100000000,8,NULL),
(7,N'Dược sĩ',N'Tư vấn và quản lý thuốc.',12000000,50000000,8,NULL),

-- 8. Giáo dục - Đào tạo
(8,N'Giảng viên Đại học',N'Giảng dạy và nghiên cứu.',15000000,50000000,8,NULL),
(8,N'Giáo viên Tiếng Anh',N'Giảng dạy tiếng Anh.',10000000,40000000,9,NULL),
(8,N'Giáo viên THPT',N'Giảng dạy bậc trung học phổ thông.',10000000,35000000,8,NULL),
(8,N'Chuyên viên Đào tạo',N'Xây dựng chương trình đào tạo.',12000000,45000000,8,NULL),

-- 9. Luật - Hành chính
(9,N'Luật sư',N'Tư vấn và bảo vệ quyền lợi pháp lý.',15000000,80000000,8,NULL),
(9,N'Chuyên viên Pháp chế',N'Đảm bảo tuân thủ pháp luật.',12000000,50000000,8,NULL),
(9,N'Công chứng viên',N'Chứng thực văn bản pháp lý.',15000000,50000000,7,NULL),
(9,N'Thẩm phán',N'Xét xử và giải quyết tranh chấp.',25000000,80000000,8,NULL),

-- 10. Thiết kế - Sáng tạo
(10,N'Graphic Designer',N'Thiết kế đồ họa.',10000000,35000000,8,NULL),
(10,N'Video Editor',N'Biên tập video.',10000000,40000000,8,NULL),
(10,N'Interior Designer',N'Thiết kế nội thất.',12000000,50000000,8,NULL),
(10,N'Motion Graphic Designer',N'Thiết kế đồ họa chuyển động.',12000000,50000000,9,NULL),

-- 11. Bất động sản - Dịch vụ
(11,N'Môi giới Bất động sản',N'Tư vấn và giao dịch bất động sản.',10000000,100000000,8,NULL),
(11,N'Chuyên viên Tư vấn Bảo hiểm',N'Tư vấn giải pháp bảo hiểm.',10000000,60000000,8,NULL),

-- 12. Du lịch - Khách sạn - Hàng không
(12,N'Hướng dẫn viên Du lịch',N'Hướng dẫn khách tham quan.',8000000,30000000,8,NULL),
(12,N'Tiếp viên Hàng không',N'Phục vụ hành khách trên máy bay.',15000000,45000000,9,NULL),
(12,N'Phi công',N'Điều khiển máy bay dân dụng.',50000000,200000000,9,NULL),
(12,N'Quản lý Khách sạn',N'Điều hành khách sạn.',15000000,60000000,8,NULL),

-- 13. Nông nghiệp Công nghệ cao
(13,N'Kỹ sư Nông nghiệp',N'Ứng dụng kỹ thuật vào nông nghiệp.',12000000,50000000,8,NULL),
(13,N'Kỹ sư Công nghệ Thực phẩm',N'Phát triển và kiểm soát thực phẩm.',12000000,50000000,8,NULL),
(13,N'Chuyên gia Nông nghiệp Công nghệ cao',N'Ứng dụng công nghệ hiện đại vào sản xuất.',15000000,60000000,9,NULL),

-- 14. Nghệ thuật - Giải trí
(14,N'MC',N'Dẫn chương trình.',10000000,100000000,8,NULL),
(14,N'Diễn viên',N'Tham gia biểu diễn nghệ thuật.',10000000,100000000,7,NULL),
(14,N'Nhiếp ảnh gia',N'Sáng tạo nội dung hình ảnh.',10000000,50000000,7,NULL),
(14,N'Nhà sáng tạo Nội dung',N'Sản xuất nội dung số.',10000000,100000000,10,NULL),

-- 15. Khoa học - Công vụ
(15,N'Nhà nghiên cứu Khoa học',N'Thực hiện nghiên cứu khoa học.',15000000,60000000,8,NULL),
(15,N'Công chức Hành chính',N'Thực hiện công tác quản lý nhà nước.',10000000,30000000,7,NULL),
(15,N'Chuyên viên Hải quan',N'Quản lý hoạt động xuất nhập khẩu.',12000000,40000000,8,NULL),
(15,N'Chuyên viên Thuế',N'Tư vấn và quản lý thuế.',12000000,50000000,8,NULL);

INSERT INTO career_mbti_matches
(career_id, mbti_type, compatibility_score)
VALUES

-- 1. Kỹ sư phần mềm
(1,'INTJ',98),
(1,'INTP',96),
(1,'ISTJ',88),

-- 2. Frontend Developer
(2,'ISFP',96),
(2,'INFP',94),
(2,'ENFP',88),

-- 3. Backend Developer
(3,'INTP',98),
(3,'INTJ',96),
(3,'ISTJ',90),

-- 4. Mobile Developer
(4,'ISTP',96),
(4,'INTP',94),
(4,'ISFP',86),

-- 5. QA Engineer
(5,'ISTJ',99),
(5,'ISFJ',92),
(5,'INTJ',88),

-- 6. Data Scientist
(6,'INTP',99),
(6,'INTJ',97),
(6,'ENTJ',90),

-- 7. AI Engineer
(7,'INTP',99),
(7,'INTJ',98),
(7,'ENTP',91),

-- 8. Cybersecurity Specialist
(8,'INTJ',99),
(8,'ISTP',95),
(8,'INTP',93),

-- 9. DevOps Engineer
(9,'ISTJ',96),
(9,'INTJ',94),
(9,'ESTJ',90),

-- 10. Business Analyst
(10,'ENTJ',97),
(10,'INTJ',94),
(10,'ENTP',90),

-- 11. Giám đốc điều hành
(11,'ENTJ',99),
(11,'ESTJ',96),
(11,'ENFJ',90),

-- 12. Quản lý Kinh doanh
(12,'ENTJ',97),
(12,'ESTJ',95),
(12,'ENTP',90),

-- 13. Quản lý Nhân sự
(13,'ENFJ',98),
(13,'ESFJ',95),
(13,'ENFP',90),

-- 14. Quản lý Vận hành
(14,'ESTJ',98),
(14,'ISTJ',94),
(14,'ENTJ',90),

-- 15. Kế toán
(15,'ISTJ',99),
(15,'ESTJ',95),
(15,'ISFJ',88),
-- 16. Kiểm toán viên
(16,'ISTJ',99),
(16,'ESTJ',95),
(16,'INTJ',90),

-- 17. Chuyên viên Tài chính
(17,'INTJ',98),
(17,'ENTJ',95),
(17,'ISTJ',90),

-- 18. Chuyên viên Phân tích Đầu tư
(18,'INTJ',99),
(18,'INTP',96),
(18,'ENTJ',92),

-- 19. Digital Marketing Specialist
(19,'ENFP',98),
(19,'ENFJ',94),
(19,'ENTP',90),

-- 20. SEO Specialist
(20,'INTJ',97),
(20,'ISTJ',94),
(20,'INTP',90),

-- 21. Content Marketing Specialist
(21,'INFP',98),
(21,'ENFP',95),
(21,'INFJ',90),

-- 22. Social Media Specialist
(22,'ESFP',97),
(22,'ENFP',95),
(22,'ENFJ',90),

-- 23. Kỹ sư Xây dựng
(23,'ISTJ',97),
(23,'ISTP',94),
(23,'ESTJ',90),

-- 24. Kỹ sư Cơ khí
(24,'ISTP',98),
(24,'INTJ',93),
(24,'ISTJ',90),

-- 25. Kỹ sư Điện
(25,'ISTP',98),
(25,'INTJ',94),
(25,'ISTJ',90),

-- 26. Kỹ sư Tự động hóa
(26,'INTJ',98),
(26,'ISTP',95),
(26,'INTP',90),

-- 27. Kỹ sư Bán dẫn
(27,'INTP',99),
(27,'INTJ',97),
(27,'ISTJ',92),

-- 28. Chuyên viên Logistics
(28,'ESTJ',97),
(28,'ISTJ',95),
(28,'ENTJ',88),

-- 29. Chuyên viên Chuỗi cung ứng
(29,'ESTJ',98),
(29,'ENTJ',94),
(29,'ISTJ',90),

-- 30. Quản lý Kho vận
(30,'ESTJ',99),
(30,'ISTJ',95),
(30,'ESFJ',86);
INSERT INTO career_mbti_matches
(career_id, mbti_type, compatibility_score)
VALUES

-- 31. Chuyên viên Xuất nhập khẩu
(31,'ESTJ',97),
(31,'ISTJ',94),
(31,'ENTJ',88),

-- 32. Bác sĩ Đa khoa
(32,'INFJ',98),
(32,'ISFJ',95),
(32,'ENFJ',90),

-- 33. Bác sĩ Chuyên khoa
(33,'INFJ',99),
(33,'INTJ',95),
(33,'ISFJ',92),

-- 34. Nha sĩ
(34,'ISTJ',98),
(34,'ISFJ',95),
(34,'ESTJ',88),

-- 35. Dược sĩ
(35,'ISFJ',98),
(35,'ISTJ',94),
(35,'INFJ',90),

-- 36. Giảng viên Đại học
(36,'INFJ',98),
(36,'INTJ',95),
(36,'ENFJ',90),

-- 37. Giáo viên Tiếng Anh
(37,'ENFJ',98),
(37,'ENFP',94),
(37,'INFJ',90),

-- 38. Giáo viên THPT
(38,'ENFJ',97),
(38,'ESFJ',94),
(38,'INFJ',90),

-- 39. Chuyên viên Đào tạo
(39,'ENFJ',98),
(39,'ENTJ',92),
(39,'ESFJ',90),

-- 40. Luật sư
(40,'ENTJ',98),
(40,'INTJ',95),
(40,'ESTJ',90),

-- 41. Chuyên viên Pháp chế
(41,'ISTJ',98),
(41,'INTJ',95),
(41,'ESTJ',90),

-- 42. Công chứng viên
(42,'ISTJ',99),
(42,'ISFJ',92),
(42,'ESTJ',90),

-- 43. Thẩm phán
(43,'INTJ',99),
(43,'ISTJ',95),
(43,'ENTJ',92),

-- 44. Graphic Designer
(44,'INFP',98),
(44,'ISFP',95),
(44,'ENFP',90),

-- 45. Video Editor
(45,'ISFP',98),
(45,'INFP',94),
(45,'ISTP',88);
INSERT INTO career_mbti_matches
(career_id, mbti_type, compatibility_score)
VALUES

-- 46. Interior Designer
(46,'INFP',98),
(46,'ISFP',95),
(46,'INFJ',90),

-- 47. Motion Graphic Designer
(47,'ISFP',98),
(47,'ENFP',94),
(47,'INFP',90),

-- 48. Môi giới Bất động sản
(48,'ENTP',98),
(48,'ENFJ',95),
(48,'ESFP',92),

-- 49. Chuyên viên Tư vấn Bảo hiểm
(49,'ENFJ',98),
(49,'ESFJ',94),
(49,'ENTJ',88),

-- 50. Hướng dẫn viên Du lịch
(50,'ESFP',98),
(50,'ENFP',95),
(50,'ENFJ',90),

-- 51. Tiếp viên Hàng không
(51,'ESFJ',98),
(51,'ENFJ',95),
(51,'ISFJ',90),

-- 52. Phi công
(52,'ISTJ',99),
(52,'ESTJ',95),
(52,'ISTP',92),

-- 53. Quản lý Khách sạn
(53,'ESFJ',98),
(53,'ENTJ',94),
(53,'ENFJ',90),

-- 54. Kỹ sư Nông nghiệp
(54,'ISTJ',97),
(54,'ISTP',94),
(54,'ISFJ',88),

-- 55. Kỹ sư Công nghệ Thực phẩm
(55,'ISTJ',98),
(55,'INTJ',94),
(55,'ISFJ',90),

-- 56. Chuyên gia Nông nghiệp Công nghệ cao
(56,'INTJ',98),
(56,'ISTJ',94),
(56,'INTP',90),

-- 57. MC
(57,'ENFP',99),
(57,'ENFJ',96),
(57,'ESFP',92),

-- 58. Diễn viên
(58,'ESFP',99),
(58,'ENFP',95),
(58,'ISFP',92),

-- 59. Nhiếp ảnh gia
(59,'ISFP',99),
(59,'INFP',95),
(59,'ISTP',88),

-- 60. Nhà sáng tạo Nội dung
(60,'ENFP',99),
(60,'ENTP',95),
(60,'INFP',92),

-- 61. Nhà nghiên cứu Khoa học
(61,'INTP',99),
(61,'INTJ',97),
(61,'ISTJ',90),

-- 62. Công chức Hành chính
(62,'ISTJ',98),
(62,'ISFJ',94),
(62,'ESTJ',90),

-- 63. Chuyên viên Hải quan
(63,'ISTJ',98),
(63,'ESTJ',95),
(63,'INTJ',88),

-- 64. Chuyên viên Thuế
(64,'ISTJ',99),
(64,'INTJ',94),
(64,'ESTJ',92);

-- =========================
-- MAJORS
-- =========================
SET IDENTITY_INSERT Majors ON;
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (1, '7140101', N'Giáo dục học', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (2, '7140103', N'Công nghệ giáo dục', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (3, '7140114', N'Quản lý giáo dục', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (4, '7140201', N'Giáo dục mầm non', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (5, '7140202', N'Giáo dục tiểu học', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (6, '7140203', N'Giáo dục đặc biệt', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (7, '7140204', N'Giáo dục công dân', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (8, '7140205', N'Giáo dục chính trị', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (9, '7140206', N'Giáo dục thể chất', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (10, '7140207', N'Huấn luyện thể thao', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (11, '7140208', N'Giáo dục quốc phòng - an ninh', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (12, '7140209', N'Sư phạm toán học', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (13, '7140210', N'Sư phạm tin học', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (14, '7140211', N'Sư phạm vật lý', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (15, '7140212', N'Sư phạm hóa học', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (16, '7140213', N'Sư phạm sinh học', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (17, '7140214', N'Sư phạm kỹ thuật công nghiệp', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (18, '7140215', N'Sư phạm kỹ thuật nông nghiệp', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (19, '7140217', N'Sư phạm ngữ văn', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (20, '7140218', N'Sư phạm lịch sử', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (21, '7140219', N'Sư phạm địa lý', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (22, '7140221', N'Sư phạm âm nhạc', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (23, '7140222', N'Sư phạm mỹ thuật', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (24, '7140223', N'Sư phạm tiếng bana', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (25, '7140224', N'Sư phạm tiếng êđê', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (26, '7140225', N'Sư phạm tiếng jrai', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (27, '7140226', N'Sư phạm tiếng khmer', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (28, '7140227', N'Sư phạm tiếng h''mong', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (29, '7140228', N'Sư phạm tiếng chăm', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (30, '7140229', N'Sư phạm tiếng m''nông', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (31, '7140230', N'Sư phạm tiếng xêđăng', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (32, '7140231', N'Sư phạm tiếng anh', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (33, '7140232', N'Sư phạm tiếng nga', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (34, '7140233', N'Sư phạm tiếng pháp', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (35, '7140234', N'Sư phạm tiếng trung quốc', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (36, '7140235', N'Sư phạm tiếng đức', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (37, '7140236', N'Sư phạm tiếng nhật', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (38, '7140237', N'Sư phạm tiếng hàn quốc', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (39, '7140245', N'Sư phạm nghệ thuật', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (40, '7140246', N'Sư phạm công nghệ', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (41, '7140247', N'Sư phạm khoa học tự nhiên', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (42, '7140248', N'Giáo dục pháp luật', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (43, '7140249', N'Sư phạm lịch sử - địa lý', '714');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (44, '7210101', N'Lý luận, lịch sử và phê bình mỹ thuật', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (45, '7210103', N'Hội họa', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (46, '7210104', N'Đồ họa', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (47, '7210105', N'Điêu khắc', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (48, '7210107', N'Gốm', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (49, '7210110', N'Mỹ thuật đô thị', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (50, '7210201', N'Âm nhạc học', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (51, '7210203', N'Sáng tác âm nhạc', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (52, '7210204', N'Chỉ huy âm nhạc', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (53, '7210205', N'Thanh nhạc', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (54, '7210207', N'Biểu diễn nhạc cụ phương tây', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (55, '7210208', N'Piano', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (56, '7210209', N'Nhạc jazz', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (57, '7210210', N'Biểu diễn nhạc cụ truyền thống', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (58, '7210221', N'Lý luận, lịch sử và phê bình sân khấu', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (59, '7210225', N'Biên kịch sân khấu', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (60, '7210226', N'Diễn viên sân khấu kịch hát', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (61, '7210227', N'Đạo diễn sân khấu', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (62, '7210231', N'Lý luận, lịch sử và phê bình điện ảnh, truyền hình', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (63, '7210233', N'Biên kịch điện ảnh, truyền hình', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (64, '7210234', N'Diễn viên kịch, điện ảnh - truyền hình', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (65, '7210235', N'Đạo diễn điện ảnh, truyền hình', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (66, '7210236', N'Quay phim', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (67, '7210241', N'Lý luận, lịch sử và phê bình múa', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (68, '7210242', N'Diễn viên múa', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (69, '7210243', N'Biên đạo múa', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (70, '7210244', N'Huấn luyện múa', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (71, '7210301', N'Nhiếp ảnh', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (72, '7210302', N'Công nghệ điện ảnh, truyền hình', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (73, '7210303', N'Thiết kế âm thanh, ánh sáng', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (74, '7210402', N'Thiết kế công nghiệp', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (75, '7210403', N'Thiết kế đồ họa', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (76, '7210404', N'Thiết kế thời trang', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (77, '7210406', N'Thiết kế mỹ thuật sân khấu, điện ảnh', '721');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (78, '7220101', N'Tiếng việt và văn hóa việt nam', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (79, '7220104', N'Hán nôm', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (80, '7220105', N'Ngôn ngữ jrai', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (81, '7220106', N'Ngôn ngữ khmer', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (82, '7220107', N'Ngôn ngữ h''mong', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (83, '7220108', N'Ngôn ngữ chăm', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (84, '7220110', N'Sáng tác văn học', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (85, '7220112', N'Văn hóa các dân tộc thiểu số việt nam', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (86, '7220201', N'Ngôn ngữ anh', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (87, '7220202', N'Ngôn ngữ nga', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (88, '7220203', N'Ngôn ngữ pháp', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (89, '7220204', N'Ngôn ngữ trung quốc', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (90, '7220205', N'Ngôn ngữ đức', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (91, '7220206', N'Ngôn ngữ tây ban nha', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (92, '7220207', N'Ngôn ngữ bồ đào nha', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (93, '7220208', N'Ngôn ngữ italia', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (94, '7220209', N'Ngôn ngữ nhật', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (95, '7220210', N'Ngôn ngữ hàn quốc', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (96, '7220211', N'Ngôn ngữ ảrập', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (97, '7229001', N'Triết học', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (98, '7229008', N'Chủ nghĩa xã hội khoa học', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (99, '7229009', N'Tôn giáo học', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (100, '7229010', N'Lịch sử', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (101, '7229020', N'Ngôn ngữ học', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (102, '7229030', N'Văn học', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (103, '7229040', N'Văn hóa học', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (104, '7229042', N'Quản lý văn hóa', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (105, '7229045', N'Gia đình học', '722');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (106, '7310101', N'Kinh tế', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (107, '7310102', N'Kinh tế chính trị', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (108, '7310104', N'Kinh tế đầu tư', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (109, '7310105', N'Kinh tế phát triển', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (110, '7310106', N'Kinh tế quốc tế', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (111, '7310107', N'Thống kê kinh tế', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (112, '7310108', N'Toán kinh tế', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (113, '7310109', N'Kinh tế số', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (114, '7310201', N'Chính trị học', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (115, '7310202', N'Xây dựng đảng và chính quyền nhà nước', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (116, '7310205', N'Quản lý nhà nước', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (117, '7310206', N'Quan hệ quốc tế', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (118, '7310301', N'Xã hội học', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (119, '7310302', N'Nhân học', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (120, '7310401', N'Tâm lý học', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (121, '7310403', N'Tâm lý học giáo dục', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (122, '7310501', N'Địa lý học', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (123, '7310601', N'Quốc tế học', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (124, '7310602', N'Châu á học', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (125, '7310607', N'Thái bình dương học', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (126, '7310608', N'Đông phương học', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (127, '7310612', N'Trung quốc học', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (128, '7310613', N'Nhật bản học', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (129, '7310614', N'Hàn quốc học', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (130, '7310620', N'Đông nam á học', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (131, '7310630', N'Việt nam học', '731');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (132, '7320101', N'Báo chí', '732');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (133, '7320104', N'Truyền thông đa phương tiện', '732');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (134, '7320105', N'Truyền thông đại chúng', '732');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (135, '7320106', N'Công nghệ truyền thông', '732');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (136, '7320107', N'Truyền thông quốc tế', '732');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (137, '7320108', N'Quan hệ công chúng', '732');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (138, '7320201', N'Thông tin - thư viện', '732');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (139, '7320205', N'Quản lý thông tin', '732');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (140, '7320303', N'Lưu trữ học', '732');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (141, '7320305', N'Bảo tàng học', '732');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (142, '7320401', N'Xuất bản', '732');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (143, '7320402', N'Kinh doanh xuất bản phẩm', '732');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (144, '7340101', N'Quản trị kinh doanh', '734');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (145, '7340115', N'Marketing', '734');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (146, '7340116', N'Bất động sản', '734');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (147, '7340120', N'Kinh doanh quốc tế', '734');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (148, '7340121', N'Kinh doanh thương mại', '734');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (149, '7340122', N'Thương mại điện tử', '734');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (150, '7340123', N'Kinh doanh thời trang và dệt may', '734');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (151, '7340201', N'Tài chính - ngân hàng', '734');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (152, '7340204', N'Bảo hiểm', '734');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (153, '7340205', N'Công nghệ tài chính', '734');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (154, '7340301', N'Kế toán', '734');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (155, '7340302', N'Kiểm toán', '734');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (156, '7340401', N'Khoa học quản lý', '734');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (157, '7340403', N'Quản lý công', '734');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (158, '7340404', N'Quản trị nhân lực', '734');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (159, '7340405', N'Hệ thống thông tin quản lý', '734');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (160, '7340406', N'Quản trị văn phòng', '734');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (161, '7340408', N'Quan hệ lao động', '734');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (162, '7340409', N'Quản lý dự án', '734');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (163, '7380101', N'Luật', '738');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (164, '7380102', N'Luật hiến pháp và luật hành chính', '738');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (165, '7380103', N'Luật dân sự và tố tụng dân sự', '738');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (166, '7380104', N'Luật hình sự và tố tụng hình sự', '738');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (167, '7380107', N'Luật kinh tế', '738');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (168, '7380108', N'Luật quốc tế', '738');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (169, '7420101', N'Sinh học', '742');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (170, '7420201', N'Công nghệ sinh học', '742');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (171, '7420202', N'Kỹ thuật sinh học', '742');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (172, '7420203', N'Sinh học ứng dụng', '742');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (173, '7440101', N'Thiên văn học', '744');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (174, '7440102', N'Vật lý học', '744');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (175, '7440106', N'Vật lý nguyên tử và hạt nhân', '744');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (176, '7440110', N'Cơ học', '744');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (177, '7440112', N'Hóa học', '744');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (178, '7440122', N'Khoa học vật liệu', '744');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (179, '7440201', N'Địa chất học', '744');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (180, '7440212', N'Bản đồ học', '744');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (181, '7440217', N'Địa lý tự nhiên', '744');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (182, '7440222', N'Khí tượng và khí hậu học', '744');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (184, '7440224', N'Thủy văn học', '744');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (185, '7440228', N'Hải dương học', '744');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (186, '7440301', N'Khoa học môi trường', '744');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (187, '7460101', N'Toán học', '746');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (188, '7460107', N'Khoa học tính toán', '746');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (189, '7460108', N'Khoa học dữ liệu', '746');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (190, '7460112', N'Toán ứng dụng', '746');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (191, '7460115', N'Toán cơ', '746');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (192, '7460117', N'Toán tin', '746');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (193, '7460201', N'Thống kê', '746');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (194, '7480101', N'Khoa học máy tính', '748');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (195, '7480102', N'Mạng máy tính và truyền thông dữ liệu', '748');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (196, '7480103', N'Kỹ thuật phần mềm', '748');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (197, '7480104', N'Hệ thống thông tin', '748');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (198, '7480106', N'Kỹ thuật máy tính', '748');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (199, '7480107', N'Trí tuệ nhân tạo', '748');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (200, '7480108', N'Công nghệ kỹ thuật máy tính', '748');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (201, '7480201', N'Công nghệ thông tin', '748');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (202, '7480202', N'An toàn thông tin', '748');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (203, '7510101', N'Công nghệ kỹ thuật kiến trúc', '751');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (204, '7510102', N'Công nghệ kỹ thuật công trình xây dựng', '751');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (205, '7510103', N'Công nghệ kỹ thuật xây dựng', '751');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (206, '7510104', N'Công nghệ kỹ thuật giao thông', '751');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (207, '7510105', N'Công nghệ kỹ thuật vật liệu xây dựng', '751');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (208, '7510201', N'Công nghệ kỹ thuật cơ khí', '751');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (209, '7510202', N'Công nghệ chế tạo máy', '751');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (210, '7510203', N'Công nghệ kỹ thuật cơ điện tử', '751');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (211, '7510205', N'Công nghệ kỹ thuật ô tô', '751');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (212, '7510206', N'Công nghệ kỹ thuật nhiệt', '751');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (213, '7510207', N'Công nghệ kỹ thuật tàu thủy', '751');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (214, '7510211', N'Bảo dưỡng công nghiệp', '751');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (215, '7510301', N'Công nghệ kỹ thuật điện, điện tử', '751');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (216, '7510302', N'Công nghệ kỹ thuật điện tử - viễn thông', '751');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (217, '7510303', N'Công nghệ kỹ thuật điều khiển và tự động hóa', '751');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (218, '7510401', N'Công nghệ kỹ thuật hóa học', '751');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (219, '7510402', N'Công nghệ vật liệu', '751');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (220, '7510406', N'Công nghệ kỹ thuật môi trường', '751');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (221, '7510407', N'Công nghệ kỹ thuật hạt nhân', '751');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (222, '7510601', N'Quản lý công nghiệp', '751');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (223, '7510604', N'Kinh tế công nghiệp', '751');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (224, '7510605', N'Logistics và quản lý chuỗi cung ứng', '751');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (225, '7510701', N'Công nghệ dầu khí và khai thác dầu', '751');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (226, '7510801', N'Công nghệ kỹ thuật in', '751');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (227, '7520101', N'Cơ kỹ thuật', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (228, '7520103', N'Kỹ thuật cơ khí', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (229, '7520114', N'Kỹ thuật cơ điện tử', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (230, '7520115', N'Kỹ thuật nhiệt', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (231, '7520116', N'Kỹ thuật cơ khí động lực', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (232, '7520117', N'Kỹ thuật công nghiệp', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (233, '7520118', N'Kỹ thuật hệ thống công nghiệp', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (234, '7520120', N'Kỹ thuật hàng không', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (235, '7520121', N'Kỹ thuật không gian', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (236, '7520122', N'Kỹ thuật tàu thủy', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (237, '7520130', N'Kỹ thuật ô tô', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (238, '7520137', N'Kỹ thuật in', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (239, '7520138', N'Kỹ thuật hàng hải', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (240, '7520201', N'Kỹ thuật điện', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (241, '7520204', N'Kỹ thuật rađa - dẫn đường', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (242, '7520205', N'Kỹ thuật thủy âm', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (243, '7520206', N'Kỹ thuật biển', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (244, '7520207', N'Kỹ thuật điện tử - viễn thông', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (245, '7520212', N'Kỹ thuật y sinh', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (246, '7520216', N'Kỹ thuật điều khiển và tự động hóa', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (247, '7520301', N'Kỹ thuật hóa học', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (248, '7520309', N'Kỹ thuật vật liệu', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (249, '7520310', N'Kỹ thuật vật liệu kim loại', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (250, '7520312', N'Kỹ thuật dệt', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (251, '7520320', N'Kỹ thuật môi trường', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (252, '7520401', N'Vật lý kỹ thuật', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (253, '7520402', N'Kỹ thuật hạt nhân', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (254, '7520501', N'Kỹ thuật địa chất', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (255, '7520502', N'Kỹ thuật địa vật lý', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (256, '7520503', N'Kỹ thuật trắc địa - bản đồ', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (257, '7520601', N'Kỹ thuật mỏ', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (258, '7520602', N'Kỹ thuật thăm dò và khảo sát', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (259, '7520604', N'Kỹ thuật dầu khí', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (260, '7520607', N'Kỹ thuật tuyển khoáng', '752');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (261, '7540101', N'Công nghệ thực phẩm', '754');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (262, '7540102', N'Kỹ thuật thực phẩm', '754');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (263, '7540104', N'Công nghệ sau thu hoạch', '754');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (264, '7540105', N'Công nghệ chế biến thủy sản', '754');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (265, '7540106', N'Đảm bảo chất lượng và an toàn thực phẩm', '754');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (266, '7540202', N'Công nghệ sợi, dệt', '754');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (267, '7540203', N'Công nghệ vật liệu dệt, may', '754');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (268, '7540204', N'Công nghệ dệt, may', '754');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (269, '7540206', N'Công nghệ da giày', '754');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (270, '7549001', N'Công nghệ chế biến lâm sản', '754');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (271, '7580101', N'Kiến trúc', '758');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (272, '7580102', N'Kiến trúc cảnh quan', '758');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (273, '7580103', N'Kiến trúc nội thất', '758');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (274, '7580104', N'Kiến trúc đô thị', '758');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (275, '7580105', N'Quy hoạch vùng và đô thị', '758');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (276, '7580106', N'Quản lý đô thị và công trình', '758');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (277, '7580108', N'Thiết kế nội thất', '758');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (278, '7580111', N'Bảo tồn di sản kiến trúc - đô thị', '758');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (279, '7580112', N'Đô thị học', '758');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (280, '7580201', N'Kỹ thuật xây dựng', '758');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (281, '7580202', N'Kỹ thuật xây dựng công trình thủy', '758');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (282, '7580203', N'Kỹ thuật xây dựng công trình biển', '758');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (283, '7580205', N'Kỹ thuật xây dựng công trình giao thông', '758');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (284, '7580210', N'Kỹ thuật cơ sở hạ tầng', '758');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (285, '7580211', N'Địa kỹ thuật xây dựng', '758');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (286, '7580212', N'Kỹ thuật tài nguyên nước', '758');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (287, '7580213', N'Kỹ thuật cấp thoát nước', '758');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (288, '7580301', N'Kinh tế xây dựng', '758');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (289, '7580302', N'Quản lý xây dựng', '758');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (290, '7620101', N'Nông nghiệp', '762');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (291, '7620102', N'Khuyến nông', '762');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (292, '7620103', N'Khoa học đất', '762');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (293, '7620105', N'Chăn nuôi', '762');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (294, '7620109', N'Nông học', '762');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (295, '7620110', N'Khoa học cây trồng', '762');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (296, '7620112', N'Bảo vệ thực vật', '762');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (297, '7620113', N'Công nghệ rau hoa quả và cảnh quan', '762');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (298, '7620114', N'Kinh doanh nông nghiệp', '762');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (299, '7620115', N'Kinh tế nông nghiệp', '762');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (300, '7620116', N'Phát triển nông thôn', '762');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (301, '7620201', N'Lâm học', '762');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (302, '7620202', N'Lâm nghiệp đô thị', '762');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (303, '7620205', N'Lâm sinh', '762');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (304, '7620211', N'Quản lý tài nguyên rừng', '762');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (305, '7620301', N'Nuôi trồng thủy sản', '762');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (306, '7620302', N'Bệnh học thủy sản', '762');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (307, '7620303', N'Khoa học thủy sản', '762');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (308, '7620304', N'Khai thác thủy sản', '762');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (309, '7620305', N'Quản lý thủy sản', '762');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (310, '7640101', N'Thú y', '764');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (311, '7720101', N'Y khoa', '772');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (312, '7720110', N'Y học dự phòng', '772');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (313, '7720115', N'Y học cổ truyền', '772');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (314, '7720201', N'Dược học', '772');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (315, '7720203', N'Hóa dược', '772');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (316, '7720301', N'Điều dưỡng', '772');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (317, '7720302', N'Hộ sinh', '772');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (318, '7720401', N'Dinh dưỡng', '772');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (319, '7720501', N'Răng - hàm - mặt', '772');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (320, '7720502', N'Kỹ thuật phục hình răng', '772');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (321, '7720601', N'Kỹ thuật xét nghiệm y học', '772');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (322, '7720602', N'Kỹ thuật hình ảnh y học', '772');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (323, '7720603', N'Kỹ thuật phục hồi chức năng', '772');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (324, '7720701', N'Y tế công cộng', '772');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (325, '7720801', N'Tổ chức và quản lý y tế', '772');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (326, '7720802', N'Quản lý bệnh viện', '772');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (327, '7729001', N'Y sinh học thể dục thể thao', '772');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (328, '7760101', N'Công tác xã hội', '776');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (329, '7760102', N'Công tác thanh thiếu niên', '776');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (330, '7760103', N'Hỗ trợ giáo dục người khuyết tật', '776');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (332, '7810101', N'Du lịch', '781');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (333, '7810103', N'Quản trị dịch vụ du lịch và lữ hành', '781');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (334, '7810201', N'Quản trị khách sạn', '781');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (335, '7810202', N'Quản trị nhà hàng và dịch vụ ăn uống', '781');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (336, '7810301', N'Quản lý thể dục thể thao', '781');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (337, '7810302', N'Huấn luyện thể thao', '781');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (339, '7810501', N'Kinh tế gia đình', '781');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (340, '7840101', N'Khai thác vận tải', '784');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (341, '7840102', N'Quản lý hoạt động bay', '784');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (342, '7840104', N'Kinh tế vận tải', '784');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (343, '7840106', N'Khoa học hàng hải', '784');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (344, '7850101', N'Quản lý tài nguyên và môi trường', '785');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (345, '7850102', N'Kinh tế tài nguyên thiên nhiên', '785');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (346, '7850103', N'Quản lý đất đai', '785');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (347, '7850201', N'Bảo hộ lao động', '785');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (348, '7860101', N'Trinh sát an ninh', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (349, '7860102', N'Trinh sát cảnh sát', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (350, '7860103', N'Trinh sát kỹ thuật', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (351, '7860104', N'Điều tra hình sự', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (352, '7860107', N'Kỹ thuật công an nhân dân', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (353, '7860108', N'Kỹ thuật hình sự', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (354, '7860109', N'Quản lý nhà nước về an ninh trật tự', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (355, '7860110', N'Quản lý trật tự an toàn giao thông', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (356, '7860111', N'Thi hành án hình sự và hỗ trợ tư pháp', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (357, '7860112', N'Tham mưu, chỉ huy công an nhân dân', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (358, '7860113', N'Phòng cháy chữa cháy và cứu nạn cứu hộ', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (359, '7860116', N'Hậu cần công an nhân dân', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (360, '7860117', N'Tình báo an ninh', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (361, '7860201', N'Chỉ huy tham mưu lục quân', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (362, '7860202', N'Chỉ huy tham mưu hải quân', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (363, '7860203', N'Chỉ huy tham mưu không quân', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (364, '7860204', N'Chỉ huy tham mưu phòng không', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (365, '7860205', N'Chỉ huy tham mưu pháo binh', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (366, '7860206', N'Chỉ huy tham mưu tăng - thiết giáp', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (367, '7860207', N'Chỉ huy tham mưu đặc công', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (368, '7860214', N'Biên phòng', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (369, '7860217', N'Tình báo quân sự', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (370, '7860218', N'Hậu cần quân sự', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (371, '7860219', N'Chỉ huy, tham mưu thông tin', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (373, '7860220', N'Chỉ huy, quản lý kỹ thuật', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (374, '7860222', N'Quân sự cơ sở', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (375, '7860226', N'Chỉ huy kỹ thuật phòng không', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (376, '7860227', N'Chỉ huy kỹ thuật tăng - thiết giáp', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (377, '7860228', N'Chỉ huy kỹ thuật công binh', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (378, '7860229', N'Chỉ huy kỹ thuật hóa học', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (379, '7860231', N'Trinh sát kỹ thuật', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (380, '7860232', N'Chỉ huy kỹ thuật hải quân', '786');
INSERT INTO Majors (Id, MajorCode, MajorName, GroupCode) VALUES (381, '7860233', N'Chỉ huy kỹ thuật tác chiến điện tử', '786');
SET IDENTITY_INSERT Majors OFF;

-- =========================
-- CAREER_MAJOR MAP
-- =========================
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (1, 196, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (1, 201, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (1, 194, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (2, 196, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (2, 201, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (3, 196, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (3, 201, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (4, 196, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (4, 201, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (5, 196, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (5, 201, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (5, 197, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (6, 189, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (6, 194, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (6, 199, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (7, 199, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (7, 194, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (7, 201, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (8, 202, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (8, 195, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (8, 201, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (9, 195, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (9, 196, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (9, 201, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (10, 159, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (10, 197, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (10, 144, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (11, 144, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (11, 106, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (12, 144, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (12, 148, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (12, 147, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (13, 158, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (13, 144, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (14, 144, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (14, 156, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (15, 154, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (15, 151, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (16, 155, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (16, 154, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (17, 151, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (17, 108, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (18, 108, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (18, 151, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (19, 145, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (19, 149, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (19, 133, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (20, 145, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (20, 149, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (21, 145, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (21, 132, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (21, 137, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (22, 145, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (22, 137, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (23, 280, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (23, 284, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (24, 228, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (24, 210, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (25, 240, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (25, 215, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (26, 246, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (26, 217, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (27, 244, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (27, 248, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (28, 224, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (28, 147, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (29, 224, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (29, 148, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (30, 224, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (30, 144, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (31, 147, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (31, 110, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (32, 311, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (33, 311, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (34, 319, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (35, 314, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (35, 315, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (36, 1, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (36, 144, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (37, 32, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (37, 86, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (38, 1, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (38, 41, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (39, 3, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (39, 158, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (40, 163, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (40, 167, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (40, 168, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (41, 163, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (41, 167, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (42, 163, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (43, 163, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (44, 75, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (44, 46, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (45, 133, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (45, 66, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (46, 277, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (46, 273, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (47, 133, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (47, 75, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (48, 146, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (48, 144, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (49, 152, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (49, 151, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (50, 332, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (50, 333, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (51, 332, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (51, 86, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (52, 234, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (52, 341, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (53, 334, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (53, 333, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (54, 290, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (54, 294, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (55, 261, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (55, 265, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (56, 290, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (56, 170, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (57, 137, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (57, 132, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (58, 64, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (58, 60, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (59, 71, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (60, 133, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (60, 145, 0);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (61, 170, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (61, 187, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (62, 116, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (62, 157, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (63, 147, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (63, 110, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (64, 154, 1);
INSERT INTO Career_Major (CareerId, MajorId, IsPrimary) VALUES (64, 151, 1);
