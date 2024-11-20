# Product Requirements Document - Mobile REST Client

## 1. Product Overview
Mobile REST Client là một ứng dụng web cho phép người dùng thực hiện và quản lý các API requests trên thiết bị di động.

## 2. Features & Requirements

### 2.1 Core Features
- Gửi HTTP requests (GET, POST, PUT, DELETE)
- Quản lý collections của API requests
- Lưu trữ lịch sử requests
- Xem và phân tích responses
- Caching responses
- Dark/Light theme support

### 2.2 User Requirements
- Giao diện mobile-first, dễ sử dụng
- Khả năng làm việc offline
- Tốc độ phản hồi nhanh
- Khả năng import/export dữ liệu

### 2.3 Technical Requirements
- Progressive Web App (PWA)
- Responsive design
- Offline support
- Local storage for data persistence

## 3. User Stories
1. Người dùng có thể gửi HTTP requests với các method khác nhau
2. Người dùng có thể tổ chức requests vào collections
3. Người dùng có thể xem lịch sử requests
4. Người dùng có thể tùy chỉnh headers và body của request
5. Người dùng có thể export/import dữ liệu

## 4. Success Metrics
- Thời gian phản hồi < 1s
- Khả năng offline > 90%
- User satisfaction > 4/5