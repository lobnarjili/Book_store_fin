package com.example.bookstore.exceptions;

import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;

import jakarta.persistence.EntityNotFoundException;

@ControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler(DuplicateBookException.class)
    // @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ResponseEntity<ErrorResponse> handleDuplicateBookException(DuplicateBookException e,
            WebRequest request) {
        final ErrorResponse errorResponse = ErrorResponse.builder()
                .timestamp(Instant.now())
                .error("Duplicate Book")
                .status(HttpStatus.BAD_REQUEST.value())
                .message(e.getMessage())
                .path(request.getDescription(false))
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ResponseEntity<ErrorResponse> handleEntityNotFoundException(EntityNotFoundException e, WebRequest request) {
        final ErrorResponse errorResponse = ErrorResponse.builder()
                .timestamp(Instant.now())
                .error("Invalid ID")
                .status(HttpStatus.NOT_FOUND.value())
                .message(e.getMessage())
                .path(request.getDescription(false))
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    // Any Other exception
    @ExceptionHandler(Exception.class)
    @ResponseBody
    public ResponseEntity<ErrorResponse> handleException(Exception e, WebRequest request) {
        final ErrorResponse errorResponse = ErrorResponse.builder()
                .timestamp(Instant.now())
                .error("Internal Server Error")
                .status(HttpStatus.BAD_REQUEST.value())
                .message(e.getMessage()+e.getClass().getName())
                .path(request.getDescription(false))
                .build();
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
    // 403 error 
    // @ExceptionHandler(AuthorizationDeniedException.class)
    // @ResponseBody
    // public ResponseEntity<ErrorResponse> handleAuthorizationDeniedException(AuthorizationDeniedException e, WebRequest request) {
    //     final ErrorResponse errorResponse = ErrorResponse.builder()
    //             .timestamp(Instant.now())
    //             .error("Forbidden")
    //             .status(HttpStatus.FORBIDDEN.value())
    //             .message(e.getMessage())
    //             .path(request.getDescription(false))
    //             .build();
    //     return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN);
    // }

    
    // @ExceptionHandler(DuplicateUserException.class)
    // @ResponseStatus(HttpStatus.BAD_REQUEST)
    // @ResponseBody
    // public ResponseEntity<ErrorResponse> HandleDuplicateUserException(DuplicateUserException e, WebRequest request) {
    //     final ErrorResponse errorResponse = ErrorResponse.builder()
    //             .timestamp(Instant.now())
    //             .error("Duplicate User")
    //             .status(HttpStatus.BAD_REQUEST.value())
    //             .message(e.getMessage())
    //             .path(request.getDescription(false))
    //             .build();
    //     return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    // }
}