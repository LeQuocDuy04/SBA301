/**
 * Author: Lê Quốc Duy
 * Service: BookingReservationService
 */
package fu.se.backend.service;

import fu.se.backend.dto.booking.BookingReservationRequest;
import fu.se.backend.dto.booking.BookingReservationResponse;
import fu.se.backend.entity.BookingReservation;
import fu.se.backend.entity.Customer;
import fu.se.backend.repository.BookingReservationRepository;
import fu.se.backend.repository.CustomerRepository;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Transactional
public class BookingReservationService {

    private final BookingReservationRepository bookingRepository;
    private final CustomerRepository customerRepository;

    public BookingReservationService(
            BookingReservationRepository bookingRepository,
            CustomerRepository customerRepository) {
        this.bookingRepository = bookingRepository;
        this.customerRepository = customerRepository;
    }

    // Convert Entity to Response DTO
    private BookingReservationResponse toResponse(BookingReservation booking) {
        BookingReservationResponse response = new BookingReservationResponse();

        response.setBookingReservationId(booking.getBookingReservationId());
        response.setBookingDate(booking.getBookingDate());
        response.setTotalPrice(booking.getTotalPrice());
        response.setCustomerId(booking.getCustomer().getCustomerId());
        response.setCustomerName(booking.getCustomer().getCustomerFullName());
        response.setBookingStatus(booking.getBookingStatus());

        return response;
    }

    // Get all bookings
    @Transactional(readOnly = true)
    public List<BookingReservationResponse> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // Get booking by ID
    @Transactional(readOnly = true)
    public BookingReservationResponse getBookingById(Integer id) {
        BookingReservation booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Booking not found"));

        return toResponse(booking);
    }

    /**
     * Get bookings by customer.
     * CUSTOMER can only view their own booking history.
     * STAFF can view any customer's booking history.
     */
    @Transactional(readOnly = true)
    public List<BookingReservationResponse> getBookingsByCustomer(
            Integer customerId,
            String email,
            String role) {

        if ("CUSTOMER".equals(role)) {
            Customer currentCustomer = customerRepository
                    .findByEmailAddress(email)
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Customer not found"
                    ));

            if (!currentCustomer.getCustomerId().equals(customerId)) {
                throw new AccessDeniedException(
                        "You can only view your own booking history"
                );
            }
        }

        return bookingRepository.findByCustomer_CustomerId(customerId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // Create booking
    /**
     * Create booking.
     * CUSTOMER is identified by JWT email.
     * STAFF can select a customer using customerId.
     */
    public BookingReservationResponse createBooking(
            BookingReservationRequest request,
            String email,
            String role) {

        Customer customer;

        if ("CUSTOMER".equals(role)) {
            customer = customerRepository.findByEmailAddress(email)
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Customer not found"
                    ));
        } else if ("STAFF".equals(role)) {
            if (request.getCustomerId() == null) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Customer ID is required for staff"
                );
            }

            customer = customerRepository.findById(request.getCustomerId())
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Customer not found"
                    ));
        } else {
            throw new AccessDeniedException("Access denied");
        }

        Integer newId = bookingRepository.findMaxBookingReservationId() + 1;

        BookingReservation booking = new BookingReservation();

        booking.setBookingReservationId(newId);
        booking.setBookingDate(request.getBookingDate());
        booking.setTotalPrice(request.getTotalPrice());
        booking.setCustomer(customer);
        booking.setBookingStatus(request.getBookingStatus());

        BookingReservation savedBooking = bookingRepository.save(booking);

        return toResponse(savedBooking);
    }

    // Update booking
    public BookingReservationResponse updateBooking(
            Integer id,
            BookingReservationRequest request) {

        BookingReservation booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Booking not found"));

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Customer not found"));

        booking.setBookingDate(request.getBookingDate());
        booking.setTotalPrice(request.getTotalPrice());
        booking.setCustomer(customer);
        booking.setBookingStatus(request.getBookingStatus());

        return toResponse(bookingRepository.save(booking));
    }

    // Delete booking
    public void deleteBooking(Integer id) {
        BookingReservation booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Booking not found"));

        bookingRepository.delete(booking);
    }
}