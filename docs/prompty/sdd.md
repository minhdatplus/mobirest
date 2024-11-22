SDD (Software Design Document) - Công cụ Quản lý Prompt (Prompty)
1. Kiến trúc hệ thống:

Ứng dụng web sử dụng kiến trúc client-server.

Client: Giao diện người dùng web được xây dựng bằng HTML, CSS và JavaScript.

Server: Xử lý logic nghiệp vụ, lưu trữ dữ liệu và cung cấp API cho client.

2. Cơ sở dữ liệu:

Sử dụng cơ sở dữ liệu (ví dụ: MongoDB, PostgreSQL) để lưu trữ thông tin prompt, nhóm, biến và người dùng.

3. API:

Cung cấp API RESTful cho client giao tiếp với server.

4. Module chính:

Module Quản lý Prompt: Xử lý việc tạo, chỉnh sửa, xóa, lưu trữ và tìm kiếm prompt.

Module Quản lý Nhóm: Xử lý việc tạo, chỉnh sửa, xóa và quản lý nhóm prompt.

Module Quản lý Biến: Xử lý việc tạo, chỉnh sửa, xóa và quản lý biến.

Module Chuyển đổi CoSTAR: Xử lý việc chuyển đổi prompt sang định dạng CoSTAR.

5. Thiết kế giao diện:

Giao diện người dùng trực quan, dễ sử dụng và thân thiện với người dùng.

Sử dụng các thành phần giao diện người dùng phổ biến như bảng, biểu mẫu, nút bấm, v.v.

6. Công nghệ:

Frontend: HTML, CSS, JavaScript, React/Angular/Vue (tùy chọn).

Backend: Node.js/Python/Java (tùy chọn).

Database: MongoDB/PostgreSQL (tùy chọn).