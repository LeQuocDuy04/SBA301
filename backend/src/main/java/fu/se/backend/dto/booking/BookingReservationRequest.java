
/**
 * Author: Lê Quốc Duy
 * DTO: BookingReservationRequest
 */
package fu.se.backend.dto.booking;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class BookingReservationRequest {

    @NotNull(message = "Booking date is required")
    private LocalDate bookingDate;

    // STAFF có thể chỉ định Customer.
    // CUSTOMER sẽ được backend xác định từ JWT.
    private Integer customerId;

    private Byte bookingStatus;

    private BigDecimal totalPrice;
}
