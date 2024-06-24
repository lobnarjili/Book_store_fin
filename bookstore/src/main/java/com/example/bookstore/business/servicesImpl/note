package com.example.bookstore.business.servicesImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bookstore.business.services.BookService;
import com.example.bookstore.dao.entites.Book;
import com.example.bookstore.dao.repositories.BookRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookRepository bookRepository;

    @Override
    public List<Book> getBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Book getBookById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
         return this.bookRepository.findById(id) .orElseThrow(() -> new EntityNotFoundException("BOOK with id: " + id + " not found"));
    }
    

    // @Override
    // public Optional<Book> getBookByCode(String code) {
    //     return bookRepository.findByCode(code);
    // }

    // @Override
    // public List<Book> getAllBooksSortedByPrice() {
    //     return bookRepository.findAllByOrderByPrixAsc();
    // }

    @Override
    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public Book updateBook(Long id,Book book) {
        if (id == null ||  book == null) {
            throw new IllegalArgumentException("ID or Book cannot be null");
        }

    getBookById(id);

        return bookRepository.save(book);
    }

    @Override
    public void deleteBookById(Long id) {
        if (id==null){
            throw new IllegalArgumentException("ID or Category cannot be null");
        }this.getBookById(id);
        bookRepository.deleteById(id);
    }

    // @Override
    // public List<Book> getBooksByCategoryId(Long categoryId) {

    //     return bookRepository.findByCategoryId(categoryId);
    // }

}