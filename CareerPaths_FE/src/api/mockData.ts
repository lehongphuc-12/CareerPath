export const questions = [
  {
    id: 1,
    text: "Khi đối mặt với một vấn đề phức tạp, bạn thường...",
    options: [
      { id: 'a', text: "Phân tích kỹ lưỡng từng thành phần nhỏ", score: { logic: 3, discipline: 1 } },
      { id: 'b', text: "Tìm kiếm sự giúp đỡ từ những người có kinh nghiệm", score: { teamwork: 3, communication: 1 } },
      { id: 'c', text: "Thử nghiệm các giải pháp khác nhau ngay lập tức", score: { creativity: 3, selfLearning: 1 } },
      { id: 'd', text: "Dành thời gian suy nghĩ để tìm ra cốt lõi vấn đề", score: { logic: 2, selfLearning: 2 } }
    ]
  },
  {
    id: 2,
    text: "Bạn thích làm việc trong môi trường như thế nào?",
    options: [
      { id: 'a', text: "Môi trường có quy trình rõ ràng, kỷ luật cao", score: { discipline: 3, logic: 1 } },
      { id: 'b', text: "Môi trường tự do, sáng tạo, không gò bó", score: { creativity: 3, selfLearning: 1 } },
      { id: 'c', text: "Môi trường làm việc nhóm, sôi nổi", score: { teamwork: 3, communication: 2 } },
      { id: 'd', text: "Môi trường yên tĩnh, tập trung nghiên cứu", score: { selfLearning: 3, logic: 1 } }
    ]
  },
  {
    id: 3,
    text: "Cách bạn truyền đạt một ý tưởng mới là...",
    options: [
      { id: 'a', text: "Vẽ sơ đồ và trình bày số liệu cụ thể", score: { logic: 3, communication: 1 } },
      { id: 'b', text: "Kể một câu chuyện truyền cảm hứng", score: { creativity: 3, communication: 2 } },
      { id: 'c', text: "Thảo luận mở để mọi người cùng đóng góp", score: { teamwork: 3, communication: 3 } },
      { id: 'd', text: "Viết một bản đề xuất chi tiết", score: { discipline: 3, logic: 1 } }
    ]
  },
  {
    id: 4,
    text: "Khi làm việc nhóm, bạn thường đóng vai trò...",
    options: [
      { id: 'a', text: "Người điều phối và giữ kỷ luật", score: { discipline: 3, teamwork: 2 } },
      { id: 'b', text: "Người đưa ra các ý tưởng táo bạo", score: { creativity: 3, logic: 1 } },
      { id: 'c', text: "Người hòa giải và kết nối các thành viên", score: { teamwork: 3, communication: 3 } },
      { id: 'd', text: "Người thực hiện các phần việc khó nhất", score: { selfLearning: 3, logic: 2 } }
    ]
  },
  {
    id: 5,
    text: "Bạn cảm thấy hào hứng nhất khi...",
    options: [
      { id: 'a', text: "Học được một kỹ năng mới hoàn toàn", score: { selfLearning: 3, creativity: 1 } },
      { id: 'b', text: "Hoàn thành công việc đúng hạn và chỉn chu", score: { discipline: 3, logic: 1 } },
      { id: 'c', text: "Thuyết phục được người khác tin theo mình", score: { communication: 3, teamwork: 1 } },
      { id: 'd', text: "Tìm ra lỗi sai trong một hệ thống lớn", score: { logic: 3, discipline: 2 } }
    ]
  }
];

export const careers = [
  {
    id: "software-engineer",
    name: "Software Engineer",
    vietnameseName: "Kỹ sư phần mềm",
    description: "Kiến tạo thế giới số thông qua mã nguồn. Một trong những ngành nghề có tốc độ phát triển và mức thu nhập hấp dẫn nhất hiện nay.",
    salary: "25M - 80M",
    growth: "+22%",
    demand: "Rất Cao",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=1000",
    radarData: { logic: 90, creativity: 70, communication: 60, discipline: 80, teamwork: 75, selfLearning: 95 },
    roadmap: [
      { year: "Năm 1", title: "Junior Developer", desc: "Học cú pháp, thư viện và cách làm việc trong team. Viết các module nhỏ và fix bug." },
      { year: "Năm 2-3", title: "Middle Engineer", desc: "Thiết kế component lớn, tối ưu hiệu suất và hướng dẫn các bạn Intern." },
      { year: "Năm 5", title: "Senior / Tech Lead", desc: "Chịu trách nhiệm về kiến trúc toàn hệ thống và đưa ra quyết định công nghệ quan trọng." }
    ]
  },
  {
    id: "digital-marketer",
    name: "Digital Marketer",
    vietnameseName: "Chuyên viên Marketing số",
    description: "Xây dựng chiến dịch quảng bá thương hiệu trên các nền tảng số. Kết hợp giữa dữ liệu và sự sáng tạo.",
    salary: "15M - 45M",
    growth: "+15%",
    demand: "Cao",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    radarData: { logic: 60, creativity: 90, communication: 95, discipline: 70, teamwork: 85, selfLearning: 80 },
    roadmap: [
      { year: "Năm 1", title: "Marketing Executive", desc: "Quản lý nội dung mạng xã hội, chạy quảng cáo cơ bản." },
      { year: "Năm 3", title: "Senior Specialist", desc: "Lập kế hoạch chiến dịch đa kênh, tối ưu hóa chuyển đổi." },
      { year: "Năm 5", title: "Marketing Manager", desc: "Quản lý ngân sách lớn, điều phối team và chiến lược thương hiệu." }
    ]
  }
];

export const mentors = [
  {
    id: 1,
    name: "Trần Minh Quân",
    role: "Senior SE tại Google",
    rating: 4.9,
    reviews: 48,
    image: "https://i.pravatar.cc/150?u=1",
    industry: "Tech",
    style: ["Practical Coding", "Direct Feedback"]
  },
  {
    id: 2,
    name: "Lê Thu Hà",
    role: "Tech Lead tại VNG",
    rating: 4.8,
    reviews: 32,
    image: "https://i.pravatar.cc/150?u=2",
    industry: "Tech",
    style: ["Career Strategy", "Supportive Tone"]
  }
];

export const blogs = [
  {
    id: 1,
    title: "Bí kíp chinh phục sự nghiệp thời đại số",
    excerpt: "Khám phá những xu hướng công nghệ mới nhất, cách xây dựng thương hiệu cá nhân...",
    author: "Nguyễn Văn A",
    date: "15/10/2023",
    readTime: "8 phút",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000",
    category: "Xu hướng"
  }
];
