
/**
 * Author: Lê Quốc Duy
 * DTO: RoomInformationRequest
 */
package fu.se.backend.dto.room;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class RoomInformationRequest {

    @NotBlank(message = "Room number is required")
    @Size(max = 50)
    private String roomNumber;

    @Size(max = 220)
    private String roomDetailDescription;

    @NotNull(message = "Room max capacity is required")
    @Min(value = 1, message = "Room max capacity must be at least 1")
    private Integer roomMaxCapacity;

    @NotNull(message = "Room type ID is required")
    private Integer roomTypeId;

    private Byte roomStatus;

    @NotNull(message = "Room price is required")
    @DecimalMin(value = "0.0", message = "Room price must be non-negative")
    private BigDecimal roomPricePerDay;
}
