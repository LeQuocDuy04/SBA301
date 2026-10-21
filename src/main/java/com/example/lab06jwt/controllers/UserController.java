package com.example.lab06jwt.controllers;

import com.example.lab06jwt.entities.User;
import com.example.lab06jwt.responses.UserResponse;
import com.example.lab06jwt.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    public UserController(UserService userService) { this.userService = userService; }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> me(Authentication authentication) {
        User current = (User) authentication.getPrincipal();
        return ResponseEntity.ok(UserResponse.from(current));
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> allUsers() {
        return ResponseEntity.ok(userService.allUsers().stream().map(UserResponse::from).toList());
    }
}
