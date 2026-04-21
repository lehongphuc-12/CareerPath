# Backend Layered Architecture (N-Tier)

Chúng ta tuân thủ mô hình **Clean Architecture / N-Tier Architecture** để tách biệt logic nghiệp vụ và hạ tầng, đảm bảo hệ thống dễ mở rộng và bảo trì.

## 1. Controller/API Layer
- Nhận request từ Client thông qua HTTP/HTTPS.
- Validate định dạng dữ liệu (sử dụng DTO/Payload).
- Gọi đến Service Layer và trả về kết quả định dạng chuẩn (`ApiResponse`).
- **Tuyệt đối không viết business logic ở đây.**

## 2. Service Layer (Business Logic)
- Trái tim của hệ thống. Chứa toàn bộ logic nghiệp vụ và quy tắc xử lý (Business Rules).
- **Interface-based Design**: Luôn sử dụng Interface để định nghĩa contract.
    - Giúp Loose Coupling (giảm sự phụ thuộc cứng).
    - Dễ dàng Unit Test bằng cách Mocking service.
    - Cho phép thay đổi Implementation mà không ảnh hưởng đến Controller.
- Xử lý Transaction, Security checks ở cấp độ logic.

## 3. Repository/Data Access Layer (DAL)
- Tương tác trực tiếp với Database thông qua **Spring Data JPA**.
- Cung cấp các phương thức CRUD chuẩn và Custom Queries.
- Trả về Entities cho Service Layer xử lý.

## 4. Entity/Domain Layer
- Định nghĩa các đối tượng cốt lõi trong hệ thống (User, Career, Test).
- Ánh xạ trực tiếp với bảng trong Database.

## 5. DTO/VO Layer (Data Transfer Objects)
- Dùng để chuyển đổi dữ liệu giữa các layer.
- Giúp ẩn các thông tin nhạy cảm (Password) và định dạng lại dữ liệu phù hợp với Frontend.

---

## 6. Key Architecture Principles

1.  **Dependency Inversion**: Phụ thuộc vào Abstraction (Interface), không phụ thuộc vào Implementation.
2.  **Single Responsibility**: Mỗi class/method chỉ nên làm một nhiệm vụ duy nhất.
3.  **Don't Repeat Yourself (DRY)**: Tái sử dụng logic thông qua Helper hoặc Common Services.

---

### Folder Structure Example

```text
src/main/java/com/example/CareerPath_BE/
  ├── controllers/       # REST Controllers
  ├── services/          # Service Interfaces
  │     └── impl/        # Service Implementations
  ├── repositories/      # JPA Repositories
  ├── entities/          # JPA Entities
  ├── dtos/              # Data Transfer Objects & API Response
  ├── config/            # configurations (Security, Database, etc.)
  ├── middlewares/       # Custom Exception Handlers & Filters
  └── utils/             # Helper classes & Constants
```
