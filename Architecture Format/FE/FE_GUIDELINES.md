# Frontend Coding Guidelines

## 1. General Rules
- **TypeScript**: Luôn sử dụng TypeScript. Không dùng `any`. Định nghĩa Interface/Type rõ ràng.
- **Naming**:
    - Components: `PascalCase` (ví dụ: `PrimaryButton.tsx`).
    - Hooks: `camelCase` với tiền tố `use` (ví dụ: `useAuth.ts`).
    - Utilities/Services: `camelCase`.
- **Logic Location**:
    - Không viết logic trong JSX.
    - Cân nhắc tách component nếu file dài trên 150 dòng.

## 2. Clean Code & Reuse
- **Prop Drilling**: Hạn chế truyền props quá 3 cấp, thay bằng Context API hoặc Store.
- **Shared Components**: Các component dùng chung (Button, Input) phải nằm trong thư mục `src/components/common`.
- **Pure Functions**: Viết các hàm logic dưới dạng pure functions trong `utils` để dễ test và tái sử dụng.

## 3. Performance & Scalability
- **Lazy Loading**: Sử dụng `React.lazy()` cho các Route lớn.
- **Memoization**: Sử dụng `useMemo`, `useCallback` đúng lúc (không lạm dụng).
- **API Optimization**: Sử dụng **React Query** (TanStack Query) để cache dữ liệu API.

## 4. AI-Powered Development Notes
- Luôn cung cấp context về architecture layer khi yêu cầu AI viết code.
- Yêu cầu AI sinh ra unit test cho các service quan trọng.
