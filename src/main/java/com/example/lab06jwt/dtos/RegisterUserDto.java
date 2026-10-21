package com.example.lab06jwt.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterUserDto {
    @NotBlank(message = "fullName is required")
    @Size(max = 120, message = "fullName must be at most 120 characters")
    private String fullName;

    @NotBlank(message = "email is required")
    @Email(message = "email must be valid")
    @Size(max = 100, message = "email must be at most 100 characters")
    private String email;

    @NotBlank(message = "password is required")
    @Size(min = 8, max = 72, message = "password must contain 8 to 72 characters")
    private String password;

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName == null ? null : fullName.trim(); }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email == null ? null : email.trim().toLowerCase(); }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
