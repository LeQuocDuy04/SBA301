/**
 * Author: Lê Quốc Duy
 * Controller: BookingDetailController
 */
package fu.se.backend.controller;

import fu.se.backend.dto.booking.BookingDetailRequest;
import fu.se.backend.dto.booking.BookingDetailResponse;
import fu.se.backend.service.BookingDetailService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking-details")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingDetailController {

    private final BookingDetailService bookingDetailService;

    public BookingDetailController(
            BookingDetailService bookingDetailService) {
        this.bookingDetailService = bookingDetailService;
    }

    // GET: Get all booking details
    @GetMapping
    public ResponseEntity<List<BookingDetailResponse>> getAll() {
        return ResponseEntity.ok(
                bookingDetailService.getAllBookingDetails());
    }

    // GET: Get booking details by booking reservation ID
    @GetMapping("/booking/{bookingReservationId}")
    public ResponseEntity<List<BookingDetailResponse>> getByBookingId(
            @PathVariable Integer bookingReservationId) {

        return ResponseEntity.ok(
                bookingDetailService.getByBookingReservationId(
                        bookingReservationId));
    }

    // POST: Create booking detail
    @PostMapping
    public ResponseEntity<BookingDetailResponse> create(
            @Valid @RequestBody BookingDetailRequest request) {

        BookingDetailResponse response =
                bookingDetailService.createBookingDetail(request);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(response);
    }

    // DELETE: Delete booking detail
    @DeleteMapping("/{bookingReservationId}/{roomId}")
    public ResponseEntity<Void> delete(
            @PathVariable Integer bookingReservationId,
            @PathVariable Integer roomId) {

        bookingDetailService.deleteBookingDetail(
                bookingReservationId, roomId);

        return ResponseEntity.noContent().build();
    }
}