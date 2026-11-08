
/**
 * Author: Lê Quốc Duy
 * Controller: BookingReservationController
 */
package fu.se.backend.controller;

import fu.se.backend.dto.booking.BookingReservationRequest;
import fu.se.backend.dto.booking.BookingReservationResponse;
import fu.se.backend.service.BookingReservationService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingReservationController {

    private final BookingReservationService bookingService;

    public BookingReservationController(
            BookingReservationService bookingService) {
        this.bookingService = bookingService;
    }

    private String getCurrentRole(Authentication authentication) {
        return authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .filter(authority -> authority.startsWith("ROLE_"))
                .map(authority -> authority.substring(5))
                .findFirst()
                .orElse("");
    }

    // STAFF: Get all bookings
    @GetMapping
    public ResponseEntity<List<BookingReservationResponse>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    // STAFF: Get booking by ID
    @GetMapping("/{id}")
    public ResponseEntity<BookingReservationResponse> getBookingById(
            @PathVariable Integer id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }

    // STAFF: View any customer's history
    // CUSTOMER: View only their own history
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<BookingReservationResponse>> getBookingsByCustomer(
            @PathVariable Integer customerId,
            Authentication authentication) {

        return ResponseEntity.ok(
                bookingService.getBookingsByCustomer(
                        customerId,
                        authentication.getName(),
                        getCurrentRole(authentication)
                )
        );
    }

    // STAFF and CUSTOMER: Create booking
    @PostMapping
    public ResponseEntity<BookingReservationResponse> createBooking(
            @Valid @RequestBody BookingReservationRequest request,
            Authentication authentication) {

        BookingReservationResponse response =
                bookingService.createBooking(
                        request,
                        authentication.getName(),
                        getCurrentRole(authentication)
                );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // STAFF: Update booking
    @PutMapping("/{id}")
    public ResponseEntity<BookingReservationResponse> updateBooking(
            @PathVariable Integer id,
            @Valid @RequestBody BookingReservationRequest request) {

        return ResponseEntity.ok(
                bookingService.updateBooking(id, request)
        );
    }

    // STAFF: Delete booking
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(
            @PathVariable Integer id) {

        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
}
