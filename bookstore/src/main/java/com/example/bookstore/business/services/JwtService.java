package com.example.bookstore.business.services;

import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
//Generer le jeton Jwt et les cookies 
public interface JwtService {
    //Generer le jeton Jwt pour la connection 
    String generateToken(Authentication authentication);
    //cRERR cookies Http avec le Jwt lors de l'authentification 
    ResponseCookie generateJwtCookie(String jwt);
    // Pour la supprission de jeton Jwt utiliser pour la deconnection 
    ResponseCookie getCleanJwtCookie();
}
