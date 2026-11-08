/**
 * Author: Lê Quốc Duy
 * Repository: BookingDetailRepository
 */
package fu.se.backend.repository;

import fu.se.backend.entity.BookingDetail;
import fu.se.backend.entity.BookingDetailId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingDetailRepository extends JpaRepository<BookingDetail, BookingDetailId> {

    List<BookingDetail> findByBookingReservation_BookingReservationId(Integer bookingReservationId);

    List<BookingDetail> findByRoomInformation_RoomId(Integer roomId);
    boolean existsByRoomInformation_RoomId(Integer roomId);

    @Query("""
    SELECT CASE WHEN COUNT(bd) > 0 THEN true ELSE false END
    FROM BookingDetail bd
    WHERE bd.roomInformation.roomId = :roomId
      AND bd.startDate < :endDate
      AND bd.endDate > :startDate
    """)
    boolean existsOverlappingBooking(
            @Param("roomId") Integer roomId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );
}