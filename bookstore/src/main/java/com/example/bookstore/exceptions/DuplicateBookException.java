package com.example.bookstore.exceptions;


public class DuplicateBookException extends Exception {
    public DuplicateBookException(String message){
        super(message);
    }
}