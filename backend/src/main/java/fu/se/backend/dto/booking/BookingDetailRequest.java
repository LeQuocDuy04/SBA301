/**
 * Author: Lê Quốc Duy
 * DTO: BookingDetailRequest
 */
package fu.se.backend.dto.booking;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class BookingDetailRequest {

    @NotNull(message = "Booking reservation ID is required")
    private Integer bookingReservationId;

    @NotNull(message = "Room ID is required")
    private Integer roomId;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    @NotNull(message = "End date is required")
    private LocalDate endDate;

    @NotNull(message = "Actual price is required")
    @DecimalMin(value = "0.0", message = "Actual price must be non-negative")
    private BigDecimal actualPrice;
}