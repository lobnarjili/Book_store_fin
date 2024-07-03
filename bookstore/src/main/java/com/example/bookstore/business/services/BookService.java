package com.example.bookstore.business.services;

import java.util.List;
import java.util.Optional;

import com.example.bookstore.dao.entites.Book;
import com.example.bookstore.exceptions.DuplicateBookException;

public interface BookService {
    List<Book> getBooks();
    // Optional<Book> getBookByCode(String code);
    // List<Book> getAllBooksSortedByPrice();
    Book createBook(Book book,Long id) throws DuplicateBookException;
    Book updateBook( Long id,Book book,Long categoryId)throws DuplicateBookException;
    void deleteBookById(Long id);
    // List<Book>getBooksByCategoryId(Long categoryId);
    Book getBookById(Long id) ;
    public Book updateBookImage(Long id,String filename);
}
