# FUMiniHotel Frontend

**Author: Lê Quốc Duy**

React + Vite frontend for the Spring Boot FUMiniHotel backend.

## Requirements
- Node.js 20+ (Node 24 is also suitable)
- Backend running at `http://localhost:8080`
- SQL Server database configured by the backend

## Run
```bash
npm install
npm run dev
```
Open `http://localhost:5173`.

## Backend URL
The default API base URL is `http://localhost:8080/api`. To override it, copy `.env.example` to `.env` and set:
```env
VITE_API_BASE_URL=http://localhost:8080/api
```
Restart Vite after changing `.env`.

## Main features
### Customer
- Register and login
- Browse rooms and room types
- Create a booking with one room (creates booking reservation then booking detail)
- View own booking history and booking details
- View and update own profile

### Staff
- Staff login
- Dashboard summary
- Customer CRUD
- Room CRUD
- Room type CRUD
- View and delete bookings; create a booking for a customer

## Important API contract notes
- Login: `POST /api/auth/login`, returns `{ token, email, role, message }`.
- Customer registration: `POST /api/customers`; status is sent as `1` by default.
- Customer profile: `/api/customers/me`.
- Room catalogue and room types use public GET endpoints.
- Customer booking: `POST /api/bookings` with `bookingDate`, `totalPrice`, `bookingStatus`; backend identifies the customer from JWT. Then `POST /api/booking-details` with `bookingReservationId`, `roomId`, `startDate`, `endDate`, `actualPrice`.
- Staff booking creation includes `customerId`.
- Staff routes require a STAFF JWT. Customer routes require a CUSTOMER JWT.

## Notes
- JWT is stored in localStorage and attached as `Authorization: Bearer <token>`.
- Backend CORS currently allows `http://localhost:5173`.
- Booking status numeric meanings are controlled by the backend/database; the UI displays the raw status value rather than assuming labels.
- This frontend follows the actual controllers and DTO field names from `backend(2).zip`.
