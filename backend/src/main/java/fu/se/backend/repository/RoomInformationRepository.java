/**
 * Author: Lê Quốc Duy
 * Repository: RoomInformationRepository
 */
package fu.se.backend.repository;

import fu.se.backend.entity.RoomInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomInformationRepository extends JpaRepository<RoomInformation, Integer> {

    List<RoomInformation> findByRoomStatus(Byte roomStatus);

    List<RoomInformation> findByRoomType_RoomTypeId(Integer roomTypeId);


}