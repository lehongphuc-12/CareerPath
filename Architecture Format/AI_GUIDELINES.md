# AI Collaboration Guidelines

## 1. Prompting Standards
- Luôn chỉ định Framework và Ngôn ngữ (TS/JS).
- Yêu cầu AI áp dụng **Layered Architecture**.
- Ưu tiên tạo **Custom Hooks** cho logic thay vì trộn vào JSX.
- Yêu cầu code có comment giải thích cho các phần khó hiểu.

## 2. AI Code Review Required
- Không copy-paste code AI trực tiếp mà không kiểm tra (Safety & Logic check).
- Kiểm tra các biến mang tính chất nhạy cảm (API Keys, Secrets).
- Đảm bảo AI không sử dụng legacy libraries.

## 3. Reusability Focus
- Khi yêu cầu AI tạo mới component, hãy yêu cầu nó làm dưới dạng **Atomic Component** hoặc có thể demo prop-types rõ ràng.
- Yêu cầu AI tách UI và Logic tách biệt hoàn toàn.
