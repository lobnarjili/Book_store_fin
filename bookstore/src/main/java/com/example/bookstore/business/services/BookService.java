package com.example.bookstore.business.services;

import java.util.List;
import java.util.Optional;

import com.example.bookstore.dao.entites.Book;

public interface BookService {
    List<Book> getBooks();
    // Optional<Book> getBookByCode(String code);
    // List<Book> getAllBooksSortedByPrice();
    Book createBook(Book book);
    Book updateBook( Long id,Book book);
    void deleteBookById(Long id);
    // List<Book>getBooksByCategoryId(Long categoryId);
    Book getBookById(Long id) ;
}
