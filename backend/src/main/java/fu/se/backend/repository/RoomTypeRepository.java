/**
 * Author: Lê Quốc Duy
 * Repository: RoomTypeRepository
 */
package fu.se.backend.repository;

import fu.se.backend.entity.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomTypeRepository extends JpaRepository<RoomType, Integer> {
}