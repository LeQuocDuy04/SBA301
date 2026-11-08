
/**
 * Author: Lê Quốc Duy
 * Configuration: SecurityConfig
 */
package fu.se.backend.config;

import fu.se.backend.security.JwtAuthenticationFilter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .exceptionHandling(exception -> exception
                        // Return 401 when user is not authenticated
                        .authenticationEntryPoint(
                                new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)
                        )

                        // Return 403 when user is authenticated but lacks permission
                        .accessDeniedHandler((request, response, accessDeniedException) -> {
                            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                            response.setContentType("application/json");
                            response.setCharacterEncoding("UTF-8");

                            response.getWriter().write(
                                    "{\"status\":403,\"error\":\"Forbidden\","
                                            + "\"message\":\"You do not have permission to access this resource\"}"
                            );
                        })
                )


                .authorizeHttpRequests(auth -> auth

                        // Allow preflight requests
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Authentication: Login and registration
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/customers").permitAll()

                        // Customer: Own profile
                        .requestMatchers("/api/customers/me/**").hasRole("CUSTOMER")

                        // Rooms and room types: Public GET
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/rooms/**",
                                "/api/room-types/**"
                        ).permitAll()

                        // Customer management: STAFF only
                        .requestMatchers("/api/customers/**").hasRole("STAFF")

                        // Room management: STAFF only
                        .requestMatchers("/api/rooms/**").hasRole("STAFF")
                        .requestMatchers("/api/room-types/**").hasRole("STAFF")

                        // Booking history: STAFF and CUSTOMER
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/bookings/customer/**"
                        ).hasAnyRole("STAFF", "CUSTOMER")

                        // Create booking: STAFF and CUSTOMER
                        .requestMatchers(
                                HttpMethod.POST,
                                "/api/bookings"
                        ).hasAnyRole("STAFF", "CUSTOMER")

                        // View all bookings and booking details: STAFF only
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/bookings",
                                "/api/bookings/*"
                        ).hasRole("STAFF")

                        // Update and delete booking: STAFF only
                        .requestMatchers(
                                HttpMethod.PUT,
                                "/api/bookings/**"
                        ).hasRole("STAFF")

                        .requestMatchers(
                                HttpMethod.DELETE,
                                "/api/bookings/**"
                        ).hasRole("STAFF")

                        // All remaining endpoints require authentication
                        .anyRequest().authenticated()
                )


                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of("http://localhost:5173")
        );

        configuration.setAllowedMethods(
                List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
        );

        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
