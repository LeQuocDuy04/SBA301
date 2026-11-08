/**
 * Author: Lê Quốc Duy
 * Controller: AuthController
 */
package fu.se.backend.controller;

import fu.se.backend.dto.auth.LoginRequest;
import fu.se.backend.dto.auth.LoginResponse;
import fu.se.backend.service.AuthService;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {
        LoginResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}