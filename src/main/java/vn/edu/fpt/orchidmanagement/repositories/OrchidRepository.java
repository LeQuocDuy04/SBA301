package vn.edu.fpt.orchidmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.fpt.orchidmanagement.pojos.Orchid;

@Repository
public interface OrchidRepository extends JpaRepository<Orchid, Integer> {

    Orchid findByOrchidNameContainingIgnoreCase(String name);
}
