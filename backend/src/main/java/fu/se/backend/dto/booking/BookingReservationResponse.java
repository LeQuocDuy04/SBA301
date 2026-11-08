/**
 * Author: Lê Quốc Duy
 * DTO: BookingReservationResponse
 */
package fu.se.backend.dto.booking;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class BookingReservationResponse {

    private Integer bookingReservationId;
    private LocalDate bookingDate;
    private BigDecimal totalPrice;
    private Integer customerId;
    private String customerName;
    private Byte bookingStatus;
}