package com.example.bookstore.business.servicesImpl;

import com.example.bookstore.business.services.UserService;
import com.example.bookstore.dao.entites.User;

// import org.springframework.dao.DataIntegrityViolationException;
// import org.springframework.security.core.Authentication;
// import org.springframework.stereotype.Service;

// import com.example.bookstore.business.services.UserService;
// import com.example.bookstore.dao.entites.User;
// import com.example.bookstore.dao.repositories.UserRepository;
// import com.example.bookstore.exceptions.DuplicateUserException;
// import com.example.bookstore.web.dto.AuthenticationUserDTO;

// @Service
// public class UserServiceImpl implements UserService{

//      // Repository to handle User entity persistence
//     private final UserRepository userRepository;

//     // Constructor injection for UserRepository
//     public UserServiceImpl(UserRepository userRepository) {
//         this.userRepository = userRepository;
//     }

//     @Override
//     public User register(User user) throws DuplicateUserException {
//         if (user == null) {
//             return null;
//         }
//         try {
//             // Save the user in the repository
//             return userRepository.save(user);
//         } catch (DataIntegrityViolationException e) {
//             // Handle uniqueness constraint violations
//             throw new DuplicateUserException("User already exists");
//         }
//     }

//     @Override
//     public AuthenticationUserDTO login(Authentication authentication) {
//         // Retrieve the user principal from the authentication object after basic authentication
//         User user = (User) authentication.getPrincipal();
//         // Convert the User entity to AuthenticationUserDTO and return it
//         return AuthenticationUserDTO.toAuthenticationUserDTO(user);
//     }
// }


import com.example.bookstore.dao.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        return userOptional.orElse(null);
    }

    @Override
    public User createUser(User user) {
        // Add logic for creating a new user, e.g., validation, encoding passwords, etc.
        return userRepository.save(user);
    }

    @Override
    public User updateUser(Long id, User user) {
        // Add logic for updating an existing user, e.g., validation, updating fields, etc.
        user.setId(id); // Ensure the user ID is set correctly
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        // Add logic for deleting a user by ID
        userRepository.deleteById(id);
    }

    @Override
    public List<User> findUsersByName(String firstname) {
        return userRepository.findByFirstnameContainingIgnoreCase(firstname);
    }


}
