-- =========================
-- ROLES
-- =========================

INSERT INTO roles(name)
VALUES 
('Admin'),
('User');

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

INSERT INTO careers 
(name, description, min_salary, max_salary, demand_level, image)
VALUES
(N'Giám đốc điều hành', N'Quản lý và điều hành hoạt động doanh nghiệp.', 30000000, 150000000, 9, NULL),

(N'Quản lý marketing', N'Lập kế hoạch và triển khai chiến lược marketing.', 15000000, 50000000, 9, NULL),

(N'Quản lý kinh doanh', N'Quản lý đội ngũ bán hàng và doanh số.', 15000000, 60000000, 8, NULL),

(N'Quản lý nhân sự', N'Tuyển dụng và quản lý nhân viên.', 12000000, 40000000, 8, NULL),

(N'Kế toán và kiểm toán', N'Quản lý tài chính và kiểm tra sổ sách kế toán.', 10000000, 35000000, 8, NULL),

(N'Chuyên viên tư vấn tài chính', N'Tư vấn đầu tư và quản lý tài chính cá nhân.', 15000000, 50000000, 8, NULL),

(N'Nhân viên tín dụng', N'Hỗ trợ khách hàng vay vốn và thẩm định hồ sơ.', 10000000, 30000000, 7, NULL),

(N'Kiểm thử phần mềm', N'Đảm bảo chất lượng và phát hiện lỗi phần mềm.', 12000000, 35000000, 9, NULL),

(N'Lập trình viên web', N'Phát triển website và ứng dụng web.', 15000000, 50000000, 10, NULL),

(N'Thiết kế UI/UX', N'Thiết kế giao diện và trải nghiệm người dùng.', 12000000, 40000000, 9, NULL),

(N'Quản trị cơ sở dữ liệu', N'Quản lý và tối ưu hệ thống cơ sở dữ liệu.', 15000000, 45000000, 8, NULL),

(N'Nhà khoa học dữ liệu', N'Phân tích dữ liệu và xây dựng mô hình AI.', 20000000, 70000000, 10, NULL),

(N'Quản lý dự án CNTT', N'Điều phối và quản lý dự án công nghệ thông tin.', 20000000, 60000000, 9, NULL),

(N'Kỹ thuật viên mạng', N'Cài đặt và bảo trì hệ thống mạng máy tính.', 10000000, 30000000, 8, NULL),

(N'IT Support', N'Hỗ trợ kỹ thuật cho người dùng máy tính.', 8000000, 20000000, 8, NULL),

(N'Kỹ sư xây dựng', N'Thiết kế và giám sát công trình xây dựng.', 12000000, 50000000, 8, NULL),

(N'Kỹ sư cơ khí', N'Thiết kế và vận hành hệ thống cơ khí.', 12000000, 45000000, 8, NULL),

(N'Kỹ sư điện', N'Thiết kế và bảo trì hệ thống điện.', 12000000, 45000000, 8, NULL),

(N'Kỹ sư robot', N'Phát triển hệ thống robot và tự động hóa.', 18000000, 60000000, 9, NULL),

(N'Kiến trúc sư', N'Thiết kế công trình và không gian xây dựng.', 15000000, 50000000, 8, NULL),

(N'Nhà thiết kế nội thất', N'Thiết kế không gian nội thất.', 10000000, 35000000, 7, NULL),

(N'Nhà thiết kế đồ họa', N'Thiết kế hình ảnh và truyền thông trực quan.', 10000000, 30000000, 9, NULL),

(N'Nhiếp ảnh gia', N'Chụp ảnh nghệ thuật và thương mại.', 8000000, 40000000, 6, NULL),

(N'Luật sư', N'Tư vấn và bảo vệ quyền lợi pháp lý.', 15000000, 80000000, 8, NULL),

(N'Giáo viên mầm non', N'Giảng dạy và chăm sóc trẻ nhỏ.', 7000000, 15000000, 7, NULL),

(N'Giáo viên tiểu học', N'Giảng dạy học sinh tiểu học.', 8000000, 20000000, 7, NULL),

(N'Giảng viên CNTT', N'Giảng dạy công nghệ thông tin tại đại học.', 15000000, 40000000, 8, NULL),

(N'Gia sư', N'Hỗ trợ học tập cá nhân cho học sinh.', 5000000, 20000000, 7, NULL),

(N'Điều dưỡng', N'Chăm sóc và hỗ trợ bệnh nhân.', 9000000, 25000000, 9, NULL),

(N'Nha sĩ', N'Khám và điều trị các bệnh về răng.', 25000000, 100000000, 8, NULL),

(N'Bác sĩ đa khoa', N'Khám và điều trị bệnh tổng quát.', 20000000, 80000000, 10, NULL),

(N'Kỹ thuật viên xét nghiệm', N'Thực hiện các xét nghiệm y khoa.', 10000000, 25000000, 8, NULL),

(N'Kỹ thuật viên thú y', N'Hỗ trợ chăm sóc và điều trị động vật.', 8000000, 20000000, 7, NULL),

(N'Bếp trưởng', N'Quản lý và chế biến món ăn.', 12000000, 50000000, 8, NULL),

(N'Nhân viên pha chế', N'Pha chế đồ uống tại quán bar hoặc cafe.', 7000000, 20000000, 7, NULL),

(N'Nhân viên pha cà phê', N'Pha chế và phục vụ cà phê.', 6000000, 15000000, 7, NULL),

(N'Phục vụ nhà hàng', N'Phục vụ khách hàng tại nhà hàng.', 6000000, 15000000, 7, NULL),

(N'Lễ tân khách sạn', N'Tiếp đón và hỗ trợ khách hàng.', 7000000, 18000000, 7, NULL),

(N'Hướng dẫn viên du lịch', N'Hướng dẫn khách du lịch tham quan.', 8000000, 30000000, 7, NULL),

(N'Môi giới bất động sản', N'Tư vấn và giao dịch bất động sản.', 10000000, 100000000, 8, NULL),

(N'Nhân viên bảo hiểm', N'Tư vấn và bán sản phẩm bảo hiểm.', 8000000, 40000000, 7, NULL),

(N'Nhân viên chăm sóc khách hàng', N'Hỗ trợ và giải đáp thắc mắc khách hàng.', 7000000, 18000000, 8, NULL),

(N'Thu ngân', N'Thực hiện thanh toán cho khách hàng.', 6000000, 12000000, 7, NULL),

(N'Nhân viên bán hàng', N'Tư vấn và bán sản phẩm.', 7000000, 25000000, 8, NULL),

(N'Thợ điện', N'Lắp đặt và sửa chữa hệ thống điện.', 10000000, 30000000, 8, NULL),

(N'Thợ mộc', N'Sản xuất và sửa chữa đồ gỗ.', 8000000, 25000000, 7, NULL),

(N'Kỹ thuật viên sửa chữa ô tô', N'Bảo trì và sửa chữa ô tô.', 10000000, 35000000, 8, NULL),

(N'Nhân viên bảo vệ', N'Đảm bảo an ninh tại khu vực làm việc.', 7000000, 18000000, 7, NULL),

(N'Lính cứu hỏa', N'Chữa cháy và cứu hộ cứu nạn.', 10000000, 25000000, 8, NULL),

(N'Tài xế giao hàng', N'Vận chuyển hàng hóa đến khách hàng.', 8000000, 25000000, 9, NULL),

(N'Tài xế xe buýt', N'Điều khiển xe buýt chở khách.', 9000000, 20000000, 7, NULL),

(N'Phi công', N'Điều khiển máy bay dân dụng.', 50000000, 200000000, 9, NULL),

(N'Tiếp viên hàng không', N'Phục vụ hành khách trên chuyến bay.', 15000000, 40000000, 8, NULL);
INSERT INTO career_mbti_matches (career_id, mbti_type, compatibility_score)
VALUES

-- 1. Giám đốc điều hành
(1, 'ENTJ', 95),
(1, 'ESTJ', 90),
(1, 'INTJ', 85),

-- 2. Quản lý marketing
(2, 'ENFP', 92),
(2, 'ENTP', 90),
(2, 'ESFP', 80),

-- 3. Quản lý kinh doanh
(3, 'ESTP', 95),
(3, 'ENTJ', 90),
(3, 'ENFJ', 85),

-- 4. Quản lý nhân sự
(4, 'ENFJ', 95),
(4, 'ESFJ', 90),
(4, 'INFJ', 82),

-- 5. Kế toán và kiểm toán
(5, 'ISTJ', 95),
(5, 'ESTJ', 88),
(5, 'INTJ', 80),

-- 6. Chuyên viên tư vấn tài chính
(6, 'ENTJ', 88),
(6, 'ESTJ', 85),
(6, 'ENFJ', 80),

-- 7. Nhân viên tín dụng
(7, 'ESTJ', 85),
(7, 'ESFJ', 80),

-- 8. Kiểm thử phần mềm
(8, 'ISTJ', 92),
(8, 'INTJ', 85),
(8, 'ISTP', 82),

-- 9. Lập trình viên web
(9, 'INTP', 95),
(9, 'ISTP', 88),
(9, 'INTJ', 85),

-- 10. Thiết kế UI/UX
(10, 'INFP', 92),
(10, 'ISFP', 90),
(10, 'ENFP', 85),

-- 11. Quản trị cơ sở dữ liệu
(11, 'ISTJ', 95),
(11, 'INTJ', 90),

-- 12. Nhà khoa học dữ liệu
(12, 'INTP', 96),
(12, 'INTJ', 92),
(12, 'ISTJ', 80),

-- 13. Quản lý dự án CNTT
(13, 'ENTJ', 95),
(13, 'ESTJ', 90),
(13, 'ENFJ', 80),

-- 14. Kỹ thuật viên mạng
(14, 'ISTP', 90),
(14, 'ISTJ', 88),

-- 15. IT Support
(15, 'ISFJ', 85),
(15, 'ISTJ', 82),

-- 16. Kỹ sư xây dựng
(16, 'ISTJ', 90),
(16, 'INTJ', 85),

-- 17. Kỹ sư cơ khí
(17, 'ISTP', 92),
(17, 'INTJ', 85),

-- 18. Kỹ sư điện
(18, 'INTP', 90),
(18, 'ISTP', 88),

-- 19. Kỹ sư robot
(19, 'INTP', 95),
(19, 'INTJ', 92),

-- 20. Kiến trúc sư
(20, 'INTJ', 96),
(20, 'INFP', 82),

-- 21. Nhà thiết kế nội thất
(21, 'ISFP', 92),
(21, 'INFP', 88),

-- 22. Nhà thiết kế đồ họa
(22, 'INFP', 95),
(22, 'ISFP', 92),
(22, 'ENFP', 82),

-- 23. Nhiếp ảnh gia
(23, 'ISFP', 95),
(23, 'INFP', 85),

-- 24. Luật sư
(24, 'ENTJ', 92),
(24, 'INTJ', 88),
(24, 'ESTJ', 85),

-- 25. Giáo viên mầm non
(25, 'ESFJ', 95),
(25, 'ENFP', 82),

-- 26. Giáo viên tiểu học
(26, 'ESFJ', 92),
(26, 'ISFJ', 88),

-- 27. Giảng viên CNTT
(27, 'INTJ', 90),
(27, 'INTP', 88),

-- 28. Gia sư
(28, 'INFJ', 88),
(28, 'ENFJ', 85),

-- 29. Điều dưỡng
(29, 'ISFJ', 95),
(29, 'ESFJ', 92),

-- 30. Nha sĩ
(30, 'ISTJ', 90),
(30, 'ISFJ', 82),

-- 31. Bác sĩ đa khoa
(31, 'INFJ', 88),
(31, 'ISFJ', 85),

-- 32. Kỹ thuật viên xét nghiệm
(32, 'ISTJ', 92),
(32, 'INTJ', 80),

-- 33. Kỹ thuật viên thú y
(33, 'ISFP', 85),
(33, 'ISFJ', 82),

-- 34. Bếp trưởng
(34, 'ESFP', 90),
(34, 'ISFP', 85),

-- 35. Nhân viên pha chế
(35, 'ESFP', 95),
(35, 'ESTP', 85),

-- 36. Nhân viên pha cà phê
(36, 'ESFP', 85),
(36, 'ISFP', 80),

-- 37. Phục vụ nhà hàng
(37, 'ESFJ', 88),
(37, 'ESFP', 85),

-- 38. Lễ tân khách sạn
(38, 'ESFJ', 90),
(38, 'ENFJ', 80),

-- 39. Hướng dẫn viên du lịch
(39, 'ENFP', 92),
(39, 'ESFP', 88),

-- 40. Môi giới bất động sản
(40, 'ENTJ', 92),
(40, 'ESTP', 88),

-- 41. Nhân viên bảo hiểm
(41, 'ESTJ', 88),
(41, 'ESFJ', 82),

-- 42. Nhân viên chăm sóc khách hàng
(42, 'ESFJ', 92),
(42, 'ENFJ', 85),

-- 43. Thu ngân
(43, 'ISFJ', 75),
(43, 'ESFJ', 70),

-- 44. Nhân viên bán hàng
(44, 'ESFP', 92),
(44, 'ESTP', 88),

-- 45. Thợ điện
(45, 'ISTP', 92),
(45, 'ISTJ', 85),

-- 46. Thợ mộc
(46, 'ISTP', 90),
(46, 'ISFP', 82),

-- 47. Kỹ thuật viên sửa chữa ô tô
(47, 'ISTP', 95),
(47, 'ESTP', 78),

-- 48. Nhân viên bảo vệ
(48, 'ISTJ', 82),
(48, 'ISFJ', 75),

-- 49. Lính cứu hỏa
(49, 'ESTP', 92),
(49, 'ESFP', 82),

-- 50. Tài xế giao hàng
(50, 'ISTP', 80),
(50, 'ISFP', 75),

-- 51. Tài xế xe buýt
(51, 'ISTJ', 82),
(51, 'ISFJ', 78),

-- 52. Phi công
(52, 'ISTP', 95),
(52, 'INTJ', 88),

-- 53. Tiếp viên hàng không
(53, 'ESFJ', 92),
(53, 'ENFJ', 88);