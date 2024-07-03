package com.example.bookstore.business.services;

import org.springframework.security.core.Authentication;

import com.example.bookstore.dao.entites.User;
import com.example.bookstore.exceptions.DuplicateUserException;
import com.example.bookstore.web.dto.AuthenticationUserDTO;

public interface AuthenticationService {
   
    User register(User user) throws DuplicateUserException;
   AuthenticationUserDTO login(Authentication authentication);
}
