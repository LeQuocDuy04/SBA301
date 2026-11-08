/**
 * Author: Lê Quốc Duy
 * Repository: CustomerRepository
 */
package fu.se.backend.repository;

import fu.se.backend.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    Optional<Customer> findByEmailAddress(String emailAddress);

    boolean existsByEmailAddress(String emailAddress);

    // Search customers by full name
    List<Customer> findByCustomerFullNameContainingIgnoreCase(String keyword);

    // Search customers by email
    List<Customer> findByEmailAddressContainingIgnoreCase(String keyword);
}