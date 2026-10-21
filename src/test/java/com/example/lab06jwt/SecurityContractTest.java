package com.example.lab06jwt;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.lab06jwt.dtos.RegisterUserDto;
import com.example.lab06jwt.repositories.UserRepository;
import com.example.lab06jwt.services.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class SecurityContractTest {
    @Autowired MockMvc mvc;
    @Autowired ObjectMapper objectMapper;
    @Autowired UserRepository userRepository;
    @Autowired PasswordEncoder passwordEncoder;

    @BeforeEach
    void cleanDatabase() { userRepository.deleteAll(); }

    @Test
    void protectedEndpointWithoutTokenIsUnauthorized() throws Exception {
        mvc.perform(get("/users/me")).andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("unauthorized"));
    }

    @Test
    void signupRejectsInvalidEmail() throws Exception {
        mvc.perform(post("/auth/signup").contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"fullName":"Student","email":"not-an-email","password":"P@ssword123"}
                    """))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("validation_failed"));
    }

    @Test
    void signupLoginAndAccessProtectedEndpoint() throws Exception {
        mvc.perform(post("/auth/signup").contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"fullName":"SBA301 Student","email":"student01@fpt.edu.vn","password":"P@ssword123"}
                    """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.email").value("student01@fpt.edu.vn"))
                .andExpect(jsonPath("$.password").doesNotExist());

        var loginResult = mvc.perform(post("/auth/login").contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"email":"student01@fpt.edu.vn","password":"P@ssword123"}
                    """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").isNotEmpty())
                .andExpect(jsonPath("$.expiresIn").value(3600000))
                .andReturn();

        JsonNode loginJson = objectMapper.readTree(loginResult.getResponse().getContentAsString());
        String token = loginJson.get("token").asText();

        mvc.perform(get("/users/me").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("student01@fpt.edu.vn"))
                .andExpect(jsonPath("$.password").doesNotExist());

        String tampered = token.substring(0, token.length() - 1) + (token.endsWith("a") ? "b" : "a");
        mvc.perform(get("/users/me").header("Authorization", "Bearer " + tampered))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void duplicateEmailReturnsConflict() throws Exception {
        String payload = """
            {"fullName":"Student","email":"student01@fpt.edu.vn","password":"P@ssword123"}
            """;
        mvc.perform(post("/auth/signup").contentType(MediaType.APPLICATION_JSON).content(payload))
                .andExpect(status().isCreated());
        mvc.perform(post("/auth/signup").contentType(MediaType.APPLICATION_JSON).content(payload))
                .andExpect(status().isConflict());
    }
}
