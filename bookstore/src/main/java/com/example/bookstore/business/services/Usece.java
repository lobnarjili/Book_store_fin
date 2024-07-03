// package com.example.bookstore.business.services;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.stereotype.Service;

// import com.example.bookstore.dao.entites.User;
// import com.example.bookstore.dao.repositories.UserRepository;

// @Service
// public class Usece {
//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private BCryptPasswordEncoder bCryptPasswordEncoder;

//     public User registerUser(User user) {
//         user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
//         return userRepository.save(user);
//     }
// }