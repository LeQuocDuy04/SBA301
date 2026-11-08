/**
 * Author: Lê Quốc Duy
 * Repository: BookingReservationRepository
 */
package fu.se.backend.repository;

import fu.se.backend.entity.BookingReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookingReservationRepository
        extends JpaRepository<BookingReservation, Integer> {

    List<BookingReservation> findByCustomer_CustomerId(Integer customerId);

    @Query("SELECT COALESCE(MAX(b.bookingReservationId), 0) FROM BookingReservation b")
    Integer findMaxBookingReservationId();
}