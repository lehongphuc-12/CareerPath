# Backend Coding Guidelines

## 1. API Design Standards (RESTful)
- **Method**: Sử dụng đúng HTTP Methods (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`).
- **Endpoint**: Sử dụng danh từ số nhiều (ví dụ: `/api/users`, `/api/orders`).
- **Version**: Nên có versioning (ví dụ: `/api/v1/...`).
- **Response Format**: Luôn trả về định dạng chuẩn:
  ```json
  {
    "success": true,
    "data": { ... },
    "message": "Success message"
  }
  ```

## 2. Error Handling & Validation
- **Global Error Handler**: Sử dụng Middleware để bắt mọi lỗi và trả về lỗi thân thiện cho client thay vì quăng cả Stack trace.
- **Status Code**: Trả về đúng mã lỗi (400 cho bad req, 401 cho unauth, 404 cho not found, 500 cho server error).
- **Validation**: Validate mọi đầu vào (Request Body, Query Params) ngay tại Controller.

## 3. Security & Scalability
- **Authentication**: Sử dụng JWT hoặc Session bảo mật. Luôn hash mật khẩu (Bcrypt).
- **Async Operations**: Sử dụng mã bất đồng bộ (Async/Await) cho các thao tác I/O (DB, File, Network).
- **Caching**: Sử dụng Redis cho các data ít thay đổi nhưng query nhiều.
- **Environment**: Tuyệt đối không hardcode DB Connection hay API Keys. Sử dụng `.env` file.

## 4. Clean Code & Reuse
- **Singleton Pattern**: Use Service/Repository as singletons.
- **Dependency Injection**: Khuyến khích sử dụng DI để dễ dàng mock data khi Unit Test.
- **Unit Testing**: Viết test cho ít nhất 80% logic trong Service Layer.
