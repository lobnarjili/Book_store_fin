package com.example.bookstore.business.services;

import org.springframework.security.core.Authentication;

import com.example.bookstore.dao.entites.User;
import com.example.bookstore.exceptions.DuplicateUserException;
import com.example.bookstore.web.dto.AuthenticationUserDTO;

// public interface UserService {
//  User register(User user) throws DuplicateUserException;
//    AuthenticationUserDTO login(Authentication authentication);
// }


import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(Long id);
    User createUser(User user);
    User updateUser(Long id, User user);
    void deleteUser(Long id);

    List<User> findUsersByName(String firstname);

}
