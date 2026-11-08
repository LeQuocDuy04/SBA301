
/**
 * Author: Lê Quốc Duy
 * DTO: RoomInformationResponse
 */
package fu.se.backend.dto.room;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class RoomInformationResponse {

    private Integer roomId;

    private String roomNumber;

    private String roomDetailDescription;

    private Integer roomMaxCapacity;

    private Integer roomTypeId;

    private String roomTypeName;

    private Byte roomStatus;

    private BigDecimal roomPricePerDay;
}
