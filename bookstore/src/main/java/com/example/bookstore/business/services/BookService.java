package com.example.bookstore.business.services;

import java.util.List;
import java.util.Optional;

import com.example.bookstore.dao.entites.Book;
import com.example.bookstore.exceptions.DuplicateBookException;
import com.example.bookstore.web.dto.BookSummaryDTO;

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
    // List<Book> getAllBooksSortedByPrice();
    // public List<Book> getAllBooksSortedByPrice() {
    //     // Création d'un objet Sort pour spécifier le tri par ordre ascendant sur la propriété "prix"
    //     Sort sortByPriceAsc = Sort.by(Sort.Direction.ASC, "prix");

    //     // Utilisation de findAll avec le paramètre Sort pour récupérer les livres triés par prix
    //     return bookRepository.findAll(sortByPriceAsc);
    // }
    Optional<Book> getBookByCode(String code);

    List<Book> getBooksByCategoryId(Long categoryId);

    // List<Book> getBooksByName(String nom);
}
