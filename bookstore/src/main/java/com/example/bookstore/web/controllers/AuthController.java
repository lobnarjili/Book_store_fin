package com.example.bookstore.web.controllers;


import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bookstore.business.services.AuthenticationService;
import com.example.bookstore.business.services.JwtService;
import com.example.bookstore.dao.entites.User;
import com.example.bookstore.exceptions.DuplicateUserException;
import com.example.bookstore.web.dto.AuthenticationUserDTO;
import com.example.bookstore.web.dto.RegisterUserDTO;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    // Injecting required services
    private final AuthenticationService authenticationService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // Constructor for dependency injection
    public AuthController(AuthenticationService authenticationService,
                           PasswordEncoder passwordEncoder,
                           JwtService jwtService) {
        this.authenticationService = authenticationService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // Endpoint for user login (sign-in)
    @PostMapping("/signin")
    public ResponseEntity<AuthenticationUserDTO> auth(Authentication authentication) {
        // Authenticate the user and generate the authenticated user DTO
        AuthenticationUserDTO authenticationUserDTO = this.authenticationService.login(authentication);
        // Generate a JWT cookie
        ResponseCookie jwtCookie = jwtService.generateJwtCookie(jwtService.generateToken(authentication));
        // Return the response with the JWT cookie in the headers
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(authenticationUserDTO);
    }

    // Endpoint for user registration (sign-up)
    @PostMapping("/signup")
    public ResponseEntity<RegisterUserDTO> register(@Valid @RequestBody RegisterUserDTO registerUserDTO) throws DuplicateUserException {
        // Register the user and return the registered user DTO
        User user = authenticationService
                .register(RegisterUserDTO.fromRegisterUserDTO(registerUserDTO, passwordEncoder));
        return ResponseEntity.ok()
                .body(RegisterUserDTO.toRegisterUserDTO(user));
    }

    // Endpoint for user logout (sign-out)
    @PostMapping("/signout")
    public ResponseEntity<Void> logout(HttpServletRequest request) {
        // Generate a clean JWT cookie to remove the existing one
        ResponseCookie jwtCookie = jwtService.getCleanJwtCookie();
        // Return the response with the clean JWT cookie in the headers
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .build();
    }

}
