# Frontend Layered Architecture

To ensure **Scalability** and **Separability**, we follow a 5-layer architecture.

## 1. View Layer (Components)
- Sử dụng **Atomic Design** (Atoms, Molecules, Organisms).
- Chỉ chứa UI và sự kiện (vídụ: `onClick`).
- Tuyệt đối không chứa logic tính toán phức tạp (Service/Hook sẽ đảm nhận).

## 2. Logic Layer (Custom Hooks)
- Mỗi component phức tạp nên có một custom hook riêng (vídụ: `useUserManagement.ts`).
- Hook quản lý state local, useEffect, và gọi đến các Services.
- Giúp UI sạch sẽ và dễ dàng Unit Test logic.

## 3. Service Layer (Business Logic)
- Chứa các hàm xử lý dữ liệu (Transform data), validation business logic.
- Không phụ thuộc vào UI Framework (có thể dùng cho cả React, Vue, hoặc Node.js).
- Reusable cho nhiều component khác nhau.

## 4. API Layer (Network/Repository)
- Cấu hình Axios/Fetch chung cho toàn dự án.
- Định nghĩa các hàm call API (vídụ: `userService.getUser(id)`).
- Handle lỗi chung (401, 403, 500) thông qua Interceptors.

## 5. Global State Layer (Store)
- Lưu trữ các thông tin dùng chung toàn app (vídụ: `currentUser`, `theme`, `cart`).
- Sử dụng Redux Toolkit hoặc Zustand.

---

### Folder Structure Example
```text
src/
  ├── components/     # View Layer
  ├── hooks/          # Logic Layer
  ├── services/       # Service Layer
  ├── api/            # API Layer
  ├── store/          # State Layer
  ├── types/          # TypeScript Types/Interfaces
  └── utils/          # Helpers (format date, currency, etc.)
```
