
/**
 * Author: Lê Quốc Duy
 * Service: CustomerService
 */
package fu.se.backend.service;

import fu.se.backend.dto.customer.CustomerRequest;
import fu.se.backend.dto.customer.CustomerResponse;
import fu.se.backend.entity.Customer;
import fu.se.backend.repository.CustomerRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    public CustomerService(
            CustomerRepository customerRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Convert Entity to Response DTO
    private CustomerResponse toResponse(Customer customer) {
        CustomerResponse response = new CustomerResponse();

        response.setCustomerId(customer.getCustomerId());
        response.setCustomerFullName(customer.getCustomerFullName());
        response.setTelephone(customer.getTelephone());
        response.setEmailAddress(customer.getEmailAddress());
        response.setCustomerBirthday(customer.getCustomerBirthday());
        response.setCustomerStatus(customer.getCustomerStatus());

        return response;
    }

    // Convert Request DTO to Entity
    private Customer toEntity(CustomerRequest request) {
        Customer customer = new Customer();

        customer.setCustomerFullName(request.getCustomerFullName());
        customer.setTelephone(request.getTelephone());
        customer.setEmailAddress(request.getEmailAddress());
        customer.setCustomerBirthday(request.getCustomerBirthday());
        customer.setCustomerStatus(request.getCustomerStatus());
        customer.setPassword(request.getPassword());

        return customer;
    }

    // Get all customers
    public List<CustomerResponse> getAllCustomers() {
        return customerRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    // Get customer by ID
    public CustomerResponse getCustomerById(Integer id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new org.springframework.web.server.ResponseStatusException(
                                org.springframework.http.HttpStatus.NOT_FOUND,
                                "Customer not found"
                        ));

        return toResponse(customer);
    }


    // Create customer

    public Customer createCustomer(Customer customer) {

        if (customerRepository.existsByEmailAddress(customer.getEmailAddress())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email already exists"
            );
        }

        customer.setPassword(
                passwordEncoder.encode(customer.getPassword())
        );

        return customerRepository.save(customer);
    }

    // Update customer
    public CustomerResponse updateCustomer(
            Integer id, CustomerRequest request) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Customer not found"));

        if (!customer.getEmailAddress().equals(request.getEmailAddress())
                && customerRepository.existsByEmailAddress(
                request.getEmailAddress())) {
            throw new RuntimeException("Email already exists");
        }

        customer.setCustomerFullName(request.getCustomerFullName());
        customer.setTelephone(request.getTelephone());
        customer.setEmailAddress(request.getEmailAddress());
        customer.setCustomerBirthday(request.getCustomerBirthday());
        customer.setCustomerStatus(request.getCustomerStatus());

        if (request.getPassword() != null
                && !request.getPassword().isBlank()) {
            customer.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        Customer updatedCustomer = customerRepository.save(customer);

        return toResponse(updatedCustomer);
    }

    // Delete customer
    public void deleteCustomer(Integer id) {
        if (!customerRepository.existsById(id)) {
            throw new org.springframework.web.server.ResponseStatusException(
                    org.springframework.http.HttpStatus.NOT_FOUND,
                    "Customer not found"
            );
        }

        customerRepository.deleteById(id);
    }

    // Search customers by name or email
    public List<CustomerResponse> searchCustomers(String keyword) {
        return customerRepository
                .findByCustomerFullNameContainingIgnoreCase(keyword)
                .stream()
                .map(this::toResponse)
                .toList();
    }


    /**
     * Get the profile of the currently authenticated customer.
     */
    public CustomerResponse getMyProfile(String email) {
        Customer customer = customerRepository.findByEmailAddress(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Customer not found"
                ));

        return toResponse(customer);
    }

    /**
     * Update the profile of the currently authenticated customer.
     */
    public CustomerResponse updateMyProfile(
            String email,
            CustomerRequest request
    ) {
        Customer customer = customerRepository.findByEmailAddress(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Customer not found"
                ));

        // Check duplicate email if customer changes email
        if (!customer.getEmailAddress().equalsIgnoreCase(request.getEmailAddress())
                && customerRepository.existsByEmailAddress(request.getEmailAddress())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email already exists"
            );
        }

        customer.setCustomerFullName(request.getCustomerFullName());
        customer.setTelephone(request.getTelephone());
        customer.setEmailAddress(request.getEmailAddress());
        customer.setCustomerBirthday(request.getCustomerBirthday());

        // Customer cannot change their own CustomerStatus

        if (request.getPassword() != null
                && !request.getPassword().isBlank()) {
            customer.setPassword(
                    passwordEncoder.encode(request.getPassword())
            );
        }

        Customer updatedCustomer = customerRepository.save(customer);

        return toResponse(updatedCustomer);
    }

}
