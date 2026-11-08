
/**
 * Author: Lê Quốc Duy
 * Entity: RoomType
 */
package fu.se.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "RoomType")
@Getter
@Setter
@NoArgsConstructor
public class RoomType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RoomTypeID")
    private Integer roomTypeId;

    @Column(name = "RoomTypeName", nullable = false, length = 50)
    private String roomTypeName;

    @Column(name = "TypeDescription", length = 250)
    private String typeDescription;

    @Column(name = "TypeNote", length = 250)
    private String typeNote;
}
