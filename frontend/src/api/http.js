/**
 * Author: Lê Quốc Duy
 * Axios client and JWT request configuration
 */
import axios from 'axios';

const http = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
    headers: {'Content-Type': 'application/json'}
});

http.interceptors.request.use((config) => {
    const token = localStorage.getItem('fuminihotel_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

http.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('fuminihotel_token');
            localStorage.removeItem('fuminihotel_user');
            if (!window.location.pathname.includes('/login')) window.dispatchEvent(new Event('auth:expired'));
        }
        return Promise.reject(error);
    }
);

export const api = {
    login: data => http.post('/auth/login', data),
    register: data => http.post('/customers', data),
    rooms: () => http.get('/rooms'),
    room: id => http.get(`/rooms/${id}`),
    roomTypes: () => http.get('/room-types'),
    customers: () => http.get('/customers'),
    customer: id => http.get(`/customers/${id}`),
    createCustomer: data => http.post('/customers', data),
    updateCustomer: (id, data) => http.put(`/customers/${id}`, data),
    deleteCustomer: id => http.delete(`/customers/${id}`),
    myProfile: () => http.get('/customers/me'),
    updateMyProfile: data => http.put('/customers/me', data),
    bookings: () => http.get('/bookings'),
    booking: id => http.get(`/bookings/${id}`),
    bookingsByCustomer: id => http.get(`/bookings/customer/${id}`),
    createBooking: data => http.post('/bookings', data),
    updateBooking: (id, data) => http.put(`/bookings/${id}`, data),
    deleteBooking: id => http.delete(`/bookings/${id}`),
    bookingDetails: () => http.get('/booking-details'),
    bookingDetailsByBooking: id => http.get(`/booking-details/booking/${id}`),
    createBookingDetail: data => http.post('/booking-details', data),
    deleteBookingDetail: (bookingId, roomId) => http.delete(`/booking-details/${bookingId}/${roomId}`),
    createRoom: data => http.post('/rooms', data),
    updateRoom: (id, data) => http.put(`/rooms/${id}`, data),
    deleteRoom: id => http.delete(`/rooms/${id}`),
    createRoomType: data => http.post('/room-types', data),
    updateRoomType: (id, data) => http.put(`/room-types/${id}`, data),
    deleteRoomType: id => http.delete(`/room-types/${id}`)
};
export default http;
