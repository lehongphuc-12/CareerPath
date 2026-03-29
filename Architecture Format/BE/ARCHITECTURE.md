# Backend Layered Architecture (N-Tier)

Chúng ta tuân thủ mô hình **Clean Architecture / N-Tier Architecture** để tách biệt logic nghiệp vụ và hạ tầng.

## 1. Controller/API Layer
- Nhận request từ Client thông qua HTTP/HTTPS.
- Validate định dạng dữ liệu (sử dụng DTO/Payload).
- Gọi đến Service Layer và trả về kết quả định dạng chuẩn (JSON).
- **Tuyệt đối không viết business logic ở đây.**

## 2. Service Layer (Business Logic)
- Trái tim của hệ thống. Chứa toàn bộ logic nghiệp vụ, quy tắc xử lý (Business Rules).
- Tương tác với Repository Layer để lấy/lưu dữ liệu.
- Xử lý Transaction, Security checks ở cấp độ logic.
- Độc lập với DB và UI Framework.

## 3. Repository/Data Access Layer (DAL)
- Tương tác trực tiếp với Database (ORM như Prisma, TypeORM, Hibernate, Entity Framework).
- Thực hiện các câu lệnh Query phức tạp, Filter, Search.
- Cung cấp dữ liệu sạch cho Service Layer dưới dạng Entities/Objects.

## 4. Entity/Domain Layer
- Định nghĩa các đối tượng cốt lõi trong hệ thống (User, Order, Product).
- Ánh xạ trực tiếp với bảng trong Database (nếu sử dụng RDBMS).

## 5. DTO/VO Layer (Data Transfer Objects)
- Dùng để chuyển đổi dữ liệu giữa các layer.
- Giúp ẩn các thông tin nhạy cảm (Password) trước khi trả về cho Client.

---

### Folder Structure Example
```text
src/
  ├── controllers/    # API Controllers
  ├── services/       # Business Logic
  ├── repositories/   # Data Access
  ├── entities/       # Database Entities
  ├── dtos/           # Data Transfer Objects
  ├── middlewares/    # Auth, Logger, Error Handler
  └── config/         # Database, Environment configuration
```
