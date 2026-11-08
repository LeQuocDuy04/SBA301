/**
 * Author: Lê Quốc Duy
 * Service: AuthService
 */
package fu.se.backend.service;

import fu.se.backend.dto.auth.LoginRequest;
import fu.se.backend.dto.auth.LoginResponse;
import fu.se.backend.entity.Customer;
import fu.se.backend.repository.CustomerRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Value("${app.staff.email}")
    private String staffEmail;

    @Value("${app.staff.password}")
    private String staffPassword;

    public AuthService(
            CustomerRepository customerRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {

        String email = request.getEmail().trim();

        // 1. Check Staff account
        if (email.equalsIgnoreCase(staffEmail)
                && request.getPassword().equals(staffPassword)) {

            String token = jwtService.generateToken(email, "STAFF");

            return new LoginResponse(
                    token,
                    email,
                    "STAFF",
                    "Staff login successful"
            );
        }

        // 2. Check Customer account
        Customer customer = customerRepository
                .findByEmailAddress(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Invalid email or password"
                ));

        if (!passwordEncoder.matches(
                request.getPassword(),
                customer.getPassword()
        )) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid email or password"
            );
        }

        String token = jwtService.generateToken(
                customer.getEmailAddress(),
                "CUSTOMER"
        );

        return new LoginResponse(
                token,
                customer.getEmailAddress(),
                "CUSTOMER",
                "Customer login successful"
        );
    }
}