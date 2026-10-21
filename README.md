# SBA301 Lab 06 — Spring Security + JWT

Project baseline theo tài liệu `SBA301_Lab06_Step_by_Step_Spring_Security_JWT_Guide.pdf`.

## Yêu cầu
- JDK 21
- Maven 3.9+
- SQL Server đang chạy
- Database `OrchidJWTLab`

## 1. Tạo database
Chạy trong SSMS:

```sql
IF DB_ID(N'OrchidJWTLab') IS NULL
    CREATE DATABASE OrchidJWTLab;
GO
```

JPA tự tạo/cập nhật bảng `users` khi chạy lần đầu.

## 2. Cấu hình kết nối
Cách nhanh: sửa `spring.datasource.username` và `spring.datasource.password` trong `src/main/resources/application.properties`, hoặc đặt environment variables:

PowerShell:
```powershell
$env:DB_USER="sa"
$env:DB_PASSWORD="YOUR_SQL_SERVER_PASSWORD"
$env:JWT_SECRET="VGhpc0lzQUxvY2FsRGV2U2VjcmV0S2V5VGhhdElzQXRMZWFzdDMyQnl0ZXM="
```

`JWT_SECRET` phải là secret Base64 tối thiểu 32 bytes sau khi decode. Giá trị fallback trong `application.properties` chỉ dành cho chạy thử local; không dùng trong production và không commit secret thật.

Nếu SQL Server dùng instance/port khác, đặt `DB_URL`, ví dụ:
```powershell
$env:DB_URL="jdbc:sqlserver://localhost:1433;databaseName=OrchidJWTLab;encrypt=true;trustServerCertificate=true"
```

## 3. Chạy ứng dụng
```bash
mvn clean test
mvn spring-boot:run
```
API chạy tại `http://localhost:8005`.

## 4. API
### Đăng ký — không cần token
`POST /auth/signup`
```json
{
  "fullName": "SBA301 Student",
  "email": "student01@fpt.edu.vn",
  "password": "P@ssword123"
}
```
Kết quả: `201 Created`. Password được mã hóa BCrypt.

### Đăng nhập — không cần token
`POST /auth/login`
```json
{
  "email": "student01@fpt.edu.vn",
  "password": "P@ssword123"
}
```
Kết quả: `200 OK`, trả `token`, `tokenType`, `expiresIn` (milliseconds).

### Thông tin tài khoản hiện tại — cần token
`GET /users/me`
Header:
```
Authorization: Bearer <token>
```

### Danh sách người dùng — cần token
`GET /users`
Response chỉ gồm `id`, `email`, `fullName`, tuyệt đối không trả password.

## 5. Postman
Tạo environment:
- `baseUrl` = `http://localhost:8005`
- `token` = để trống

Ở tab Tests của request login:
```javascript
const json = pm.response.json();
pm.environment.set("token", json.token);
```
Các request protected dùng header `Authorization: Bearer {{token}}`.

## 6. Kết quả mong đợi
- Signup hợp lệ: `201`
- Email trùng: `409`
- Email/password không hợp lệ khi đăng ký: `400`
- Login sai: `401`
- `/users/me` không token: `401`
- JWT sai/chỉnh sửa/hết hạn: `401`
- `/users/me` với JWT hợp lệ: `200`
- Chạy test tự động: `mvn test`

## Lưu ý
Đây là baseline học tập. `ddl-auto=update` và secret mặc định chỉ dùng local lab. Production nên dùng secret qua secret manager, schema migration bằng Flyway/Liquibase, HTTPS, rate limiting và logging đã che dữ liệu nhạy cảm.
