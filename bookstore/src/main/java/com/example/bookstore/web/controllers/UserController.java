package com.example.bookstore.web.controllers;

import com.example.bookstore.business.services.AuthenticationService;
import com.example.bookstore.business.services.UserService;
import com.example.bookstore.dao.entites.User;
import com.example.bookstore.exceptions.DuplicateUserException;
import com.example.bookstore.web.dto.RegisterUserDTO;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/users")
@PreAuthorize("hasAnyRole('ADMIN')")
public class UserController {

 private final AuthenticationService authenticationService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(AuthenticationService authenticationService, UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationService = authenticationService;
    }

    // Endpoint to create a new user (sign-up)
    // @PostMapping("/signup")
    // public ResponseEntity<User> signUp(@jakarta.validation.Valid @RequestBody RegisterUserDTO registerUserDTO) throws DuplicateUserException {
    //     // Convert RegisterUserDTO to User entity and encode the password
    //     User newUser = userService.createUser(registerUserDTO.toUser(passwordEncoder));
    //     return ResponseEntity.ok(newUser);
    // }


// Endpoint to create a new user
    @PostMapping()
    @PreAuthorize("hasAnyRole('ADMIN') and hasAuthority('WRITE_PRIVILEGE')")
    //    @PostMapping("/signup")
    public ResponseEntity<RegisterUserDTO> register(@Valid @RequestBody RegisterUserDTO registerUserDTO) throws DuplicateUserException {
        // Register the user and return the registered user DTO
        User user = authenticationService
                .register(RegisterUserDTO.fromRegisterUserDTO(registerUserDTO, passwordEncoder));
        return ResponseEntity.ok()
                .body(RegisterUserDTO.toRegisterUserDTO(user));
    }


    // Endpoint to retrieve all users (for admin, if needed)


    @GetMapping()
@PreAuthorize("hasAnyRole('ADMIN') and hasAuthority('READ_PRIVILEGE')")
public ResponseEntity<List<User>> getAllUsers() {
    List<User> users = userService.getAllUsers();
    return ResponseEntity.ok(users);
}



@GetMapping("/{id}")
@PreAuthorize("hasAnyRole('ADMIN') and hasAuthority('READ_PRIVILEGE')")
public ResponseEntity<User> getUserById(@PathVariable Long id) {
    User user = userService.getUserById(id);
    return ResponseEntity.ok(user);
}




@PutMapping("/{id}")
@PreAuthorize("hasAnyRole('ADMIN') and hasAuthority('UPDATE_PRIVILEGE')")
public ResponseEntity<User> updateUser(@PathVariable Long id, @Valid @RequestBody RegisterUserDTO registerUserDTO) {
    getUserById(id);
    User updatedUser = userService.updateUser(id, RegisterUserDTO.fromRegisterUserDTO(registerUserDTO, passwordEncoder));
    return ResponseEntity.ok(updatedUser);
}

@DeleteMapping("/{id}")
@PreAuthorize("hasAnyRole('ADMIN') and hasAuthority('DELETE_PRIVILEGE')")
public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
    userService.deleteUser(id);
    return ResponseEntity.ok().build();
}


   // Endpoint pour rechercher les utilisateurs par nom
   @GetMapping("/{name}")
   @PreAuthorize("hasAnyRole('ADMIN') and hasAuthority('READ_PRIVILEGE')")
   public ResponseEntity<List<User>> getUsersByName(@RequestParam("firstname") String firstname) {
       List<User> users = userService.findUsersByName(firstname);
       return ResponseEntity.ok(users);
   }



    // @GetMapping
    // public ResponseEntity<List<User>> getAllUsers() {
    //     List<User> users = userService.getAllUsers();
    //     return ResponseEntity.ok(users);
    // }

    // Other CRUD endpoints for update, delete, and get by ID as previously defined

    // Example: Endpoint to update an existing user
//     @PutMapping("/{id}")
//     public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody RegisterUserDTO registerUserDTO) {
//         User updatedUser = userService.updateUser(id, registerUserDTO.toUser(passwordEncoder));
//         return ResponseEntity.ok(updatedUser);
//     }
 }






//package com.example.bookstore.web.controllers;


// import com.example.bookstore.business.services.UserService;
// import com.example.bookstore.dao.entites.User;
// import com.example.bookstore.exceptions.DuplicateUserException;
// import com.example.bookstore.web.dto.RegisterUserDTO;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;



// @RestController
// @RequestMapping("/api/users")
// public class UserController {

//     private final UserService userService;
//     private final PasswordEncoder passwordEncoder;

//     @Autowired
//     public UserController(UserService userService, PasswordEncoder passwordEncoder) {
//         this.userService = userService;
//         this.passwordEncoder = passwordEncoder;
//     }

//     // Endpoint to create a new user (sign-up)
//     @PostMapping()
//     public ResponseEntity<User> signUp(@jakarta.validation.Valid @RequestBody RegisterUserDTO registerUserDTO) throws DuplicateUserException {
//         // Convert RegisterUserDTO to User entity and encode the password
//         User newUser = userService.createUser(registerUserDTO.toUser(passwordEncoder));
//         return ResponseEntity.ok(newUser);
//     }

//     // Endpoint to retrieve all users (for admin, if needed)
//     @GetMapping
//     public ResponseEntity<List<User>> getAllUsers() {
//         List<User> users = userService.getAllUsers();
//         return ResponseEntity.ok(users);
//     }

//     // Other CRUD endpoints for update, delete, and get by ID as previously defined
// }




//package com.example.bookstore.web.controllers;

// import com.example.bookstore.business.services.UserService;   
// import com.example.bookstore.dao.entites.User;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/users")
// @PreAuthorize("hasAnyRole('ADMIN')")
// public class UserController {

//     private final UserService userService;

//     @Autowired
//     public UserController(UserService userService) {
//         this.userService = userService;
//     }

//     // Endpoint to retrieve all users
//     @GetMapping
//     @PreAuthorize("hasAnyRole('ADMIN') and hasAuthority('READ_PRIVILEGE')")
//     public ResponseEntity<List<User>> getAllUsers() {
//         List<User> users = userService.getAllUsers();
//         return ResponseEntity.ok(users);
//     }

//     // Endpoint to retrieve a single user by ID
//     @GetMapping("/{id}")
//     @PreAuthorize("hasAnyRole('ADMIN') and hasAuthority('READ_PRIVILEGE')")
//     public ResponseEntity<User> getUserById(@PathVariable Long id) {
//         User user = userService.getUserById(id);
//         return ResponseEntity.ok(user);
//     }

//     // Endpoint to create a new user
//     @PostMapping()
//     @PreAuthorize("hasAnyRole('ADMIN') and hasAuthority('WRITE_PRIVILEGE')")
//     public ResponseEntity<User> createUser(@RequestBody User user) {
//         User newUser = userService.createUser(user);
//         return ResponseEntity.ok(newUser);
//     }

//     // Endpoint to update an existing user
//     @PutMapping("/{id}")
//     @PreAuthorize("hasAnyRole('ADMIN') and hasAuthority('UPDATE_PRIVILEGE')")
//     public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
//         User updatedUser = userService.updateUser(id, user);
//         return ResponseEntity.ok(updatedUser);
//     }

//     // Endpoint to delete a user
//     @DeleteMapping("/{id}")
//     @PreAuthorize("hasAnyRole('ADMIN') and hasAuthority('DELETE_PRIVILEGE')")
//     public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
//         userService.deleteUser(id);
//         return ResponseEntity.ok().build();
//     }
// }







// package com.example.bookstore.web.controllers;


// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseCookie;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.oauth2.core.OAuth2AccessToken;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RestController;

// import com.example.bookstore.business.services.AuthenticationService;
// import com.example.bookstore.business.services.JwtService;
// import com.example.bookstore.dao.entites.User;
// import com.example.bookstore.exceptions.DuplicateUserException;
// import com.example.bookstore.web.dto.AuthenticationUserDTO;
// import com.example.bookstore.web.dto.RegisterUserDTO;

// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.validation.Valid;
// import org.springframework.web.bind.annotation.*;


// import com.example.bookstore.business.services.UserService;

// @RestController
// @RequestMapping("/api/users")
// public class UserController {
// // Injecting required services

    
//     private final UserService userService;
//     private final PasswordEncoder passwordEncoder;
//     private final JwtService jwtService;

//     // Constructor for dependency injection
//     public  UserController (UserService userService,
//                            PasswordEncoder passwordEncoder,
//                            JwtService jwtService) {
//         this.
//         userService = userService;
//         this.passwordEncoder = passwordEncoder;
//         this.jwtService = jwtService;
//     }

//     // // Endpoint for user login (sign-in)
//     // @PostMapping("/signin")
//     // public ResponseEntity<AuthenticationUserDTO> auth(Authentication authentication) {
//     //     // Authenticate the user and generate the authenticated user DTO
//     //     AuthenticationUserDTO authenticationUserDTO = this.userService.login(authentication);
//     //     // Generate a JWT cookie
//     //     ResponseCookie jwtCookie = jwtService.generateJwtCookie(jwtService.generateToken(authentication));
//     //     // Return the response with the JWT cookie in the headers
//     //     return ResponseEntity.ok()
//     //             .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
//     //             .body(authenticationUserDTO);
//     // }

//     // Endpoint for user registration (sign-up)
//     @PostMapping()
//     public ResponseEntity<RegisterUserDTO> register(@Valid @RequestBody RegisterUserDTO registerUserDTO) throws DuplicateUserException {
//         // Register the user and return the registered user DTO
//         User user = userService
//                 .register(RegisterUserDTO.fromRegisterUserDTO(registerUserDTO, passwordEncoder));
//         return ResponseEntity.ok()
//                 .body(RegisterUserDTO.toRegisterUserDTO(user));
//     }

//     // // Endpoint for user logout (sign-out)
//     // @PostMapping("/signout")
//     // public ResponseEntity<Void> logout(HttpServletRequest request) {
//     //     // Generate a clean JWT cookie to remove the existing one
//     //     ResponseCookie jwtCookie = jwtService.getCleanJwtCookie();
//     //     // Return the response with the clean JWT cookie in the headers
//     //     return ResponseEntity.ok()
//     //             .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
//     //             .build();
//     // }

//     // @PostMapping("/refresh-token")
//     // public ResponseEntity<?> refreshToken(@RequestParam("refreshToken") String refreshToken) {
//     //     try {
//     //         String newToken = JwtService.refreshToken(refreshToken);
//     //         ResponseCookie jwtCookie = jwtService.generateJwtCookie(newToken);
//     //         return ResponseEntity.ok()
//     //                 .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
//     //                 .body(newToken);
//     //     } catch (Exception e) {
//     //         return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired refresh token");
//     //     }
//     // }
// }