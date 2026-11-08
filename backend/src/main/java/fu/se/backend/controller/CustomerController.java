
/**
 * Author: Lê Quốc Duy
 * Controller: CustomerController
 */
package fu.se.backend.controller;

import fu.se.backend.dto.customer.CustomerRequest;
import fu.se.backend.dto.customer.CustomerResponse;
import fu.se.backend.entity.Customer;
import fu.se.backend.service.CustomerService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    // GET: Get all customers (Staff)
    @GetMapping
    public ResponseEntity<List<CustomerResponse>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    // GET: Get customer by ID (Staff)
    @GetMapping("/{id}")
    public ResponseEntity<CustomerResponse> getCustomerById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(customerService.getCustomerById(id));
    }

    // GET: Get current customer's profile
    @GetMapping("/me")
    public ResponseEntity<CustomerResponse> getMyProfile(
            Authentication authentication) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                customerService.getMyProfile(email)
        );
    }

    // POST: Register customer (Public)
    @PostMapping
    public ResponseEntity<CustomerResponse> createCustomer(
            @Valid @RequestBody CustomerRequest request) {

        Customer customer = new Customer();

        customer.setCustomerFullName(request.getCustomerFullName());
        customer.setTelephone(request.getTelephone());
        customer.setEmailAddress(request.getEmailAddress());
        customer.setCustomerBirthday(request.getCustomerBirthday());
        customer.setCustomerStatus(request.getCustomerStatus());
        customer.setPassword(request.getPassword());

        Customer savedCustomer = customerService.createCustomer(customer);

        CustomerResponse response = new CustomerResponse();

        response.setCustomerId(savedCustomer.getCustomerId());
        response.setCustomerFullName(savedCustomer.getCustomerFullName());
        response.setTelephone(savedCustomer.getTelephone());
        response.setEmailAddress(savedCustomer.getEmailAddress());
        response.setCustomerBirthday(savedCustomer.getCustomerBirthday());
        response.setCustomerStatus(savedCustomer.getCustomerStatus());

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // PUT: Update customer by ID (Staff)
    @PutMapping("/{id}")
    public ResponseEntity<CustomerResponse> updateCustomer(
            @PathVariable Integer id,
            @Valid @RequestBody CustomerRequest request) {

        return ResponseEntity.ok(
                customerService.updateCustomer(id, request)
        );
    }

    // PUT: Update current customer's profile
    @PutMapping("/me")
    public ResponseEntity<CustomerResponse> updateMyProfile(
            Authentication authentication,
            @Valid @RequestBody CustomerRequest request) {

        String email = authentication.getName();

        return ResponseEntity.ok(
                customerService.updateMyProfile(email, request)
        );
    }

    // DELETE: Delete customer (Staff)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(
            @PathVariable Integer id) {

        customerService.deleteCustomer(id);

        return ResponseEntity.noContent().build();
    }
}
