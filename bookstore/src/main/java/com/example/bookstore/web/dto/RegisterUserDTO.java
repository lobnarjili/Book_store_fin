package com.example.bookstore.web.dto;

import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.bookstore.dao.entites.User;
import com.example.bookstore.dao.enums.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record RegisterUserDTO(
        @NotBlank(message = "firstname is required") String firstname,
        @NotBlank(message = "lastname is required") String lastname,
        @NotBlank(message = "email is required") @Email(message = "email format is not valid") String email,
        @NotBlank(message = "password is required") @Size(min = 6, message = "Password must be at most 6 characters long") String password,
        @NotNull Role role) {

    public static User fromRegisterUserDTO(RegisterUserDTO registerUserDTO, PasswordEncoder passwordEncoder) {
        User user = User.builder()
                .firstname(registerUserDTO.firstname())
                .lastname(registerUserDTO.lastname())
                .email(registerUserDTO.email())
                .password(passwordEncoder.encode(registerUserDTO.password()))
                .role(registerUserDTO.role())
                .build();
        return user;
    }

    public static RegisterUserDTO toRegisterUserDTO(User user) {
        return new RegisterUserDTO(user.getFirstname(),
                user.getLastname(),
                user.getEmail(),
                user.getPassword(),
                user.getRole());
    }
}
