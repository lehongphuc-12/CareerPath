# Frontend Layered Architecture

Để đảm bảo tính **Mở rộng (Scalability)** và **Khả năng tách biệt (Separability)**, dự án tuân thủ cấu trúc kiến trúc 6 lớp (6-layer architecture).

## 1. View Layer (Components)
- Sử dụng tư duy **Atomic Design** để phân chia component (Atoms, Molecules, Organisms).
- Chỉ chứa UI và các sự kiện người dùng cơ bản (ví dụ: `onClick`).
- Tuyệt đối không chứa logic tính toán phức tạp; các logic này sẽ được đảm nhận bởi Custom Hooks hoặc Services.

## 2. Logic Layer (Custom Hooks)
- Mỗi tính năng hoặc component phức tạp nên có một custom hook riêng (ví dụ: `useUserManagement.ts`).
- Hook chịu trách nhiệm quản lý state local, xử lý `useEffect`, và điều phối dữ liệu từ các Services.
- Giúp UI sạch sẽ, tập trung vào hiển thị và dễ dàng Unit Test cho logic.

## 3. Service Layer (Business Logic)
- Nơi thực hiện các nghiệp vụ chính (Business Logic), biến đổi dữ liệu (Data Transformation), và kiểm tra tính hợp lệ (Validation).
- Không phụ thuộc vào UI Framework, giúp logic có tính tái sử dụng cao cho nhiều component khác nhau.

## 4. API Layer (Network/Repository)
- Cấu hình tập trung cho Axios/Fetch (Base URL, Timeout, Interceptors).
- Định nghĩa các hàm giao tiếp với Backend (ví dụ: `userService.getUser(id)`).
- Xử lý lỗi hệ thống chung (401, 403, 500) thông qua Interceptors để đảm bảo tính đồng nhất.

## 5. Global State Layer (Store)
- Lưu trữ các thông tin cần truy cập từ mọi nơi trong ứng dụng (ví dụ: `currentUser`, `theme`, `cart`).
- Sử dụng các thư viện quản lý state mạnh mẽ như Redux Toolkit hoặc Zustand.

## 6. Routing Layer (Navigation)
- Quản lý tập trung toàn bộ các tuyến đường (routes) của ứng dụng tại thư mục `src/routes`.
- Sử dụng `paths.ts` để định nghĩa hằng số cho URL, loại bỏ hoàn toàn việc hard-code chuỗi ký tự.
- Cho phép quản lý phân quyền (Guard Routes) và layout lồng nhau một cách linh hoạt.

---

### Folder Structure Example
```text
src/
  ├── api/            # Hệ thống gọi API và cấu hình Network
  ├── components/     # Các thành phần giao diện (UI, Layouts)
  ├── hooks/          # Logic xử lý tại Component (State & Lifecycle)
  ├── routes/         # Cấu trúc điều hướng và hằng số đường dẫn
  ├── services/       # Xử lý nghiệp vụ và biến đổi dữ liệu
  ├── store/          # Quản lý trạng thái toàn cục (Global State)
  ├── types/          # Định nghĩa kiểu dữ liệu (TypeScript Interfaces/Types)
  └── utils/          # Các hàm tiện ích dùng chung (Formatters, Helpers)
```
