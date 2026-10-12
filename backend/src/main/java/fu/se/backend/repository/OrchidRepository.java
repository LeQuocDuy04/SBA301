package fu.se.backend.repository;

import fu.se.backend.entity.Orchid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrchidRepository extends JpaRepository<Orchid, Integer> {
}
