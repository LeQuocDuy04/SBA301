
/**
 * Author: Lê Quốc Duy
 * DTO: CustomerResponse
 */
package fu.se.backend.dto.customer;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class CustomerResponse {

    private Integer customerId;

    private String customerFullName;

    private String telephone;

    private String emailAddress;

    private LocalDate customerBirthday;

    private Byte customerStatus;
}
