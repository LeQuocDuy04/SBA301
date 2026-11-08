/**
 * Author: Lê Quốc Duy
 * DTO: BookingDetailResponse
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
public class BookingDetailResponse {

    private Integer bookingReservationId;

    private Integer roomId;
    private String roomNumber;

    private LocalDate startDate;
    private LocalDate endDate;

    private BigDecimal actualPrice;
}