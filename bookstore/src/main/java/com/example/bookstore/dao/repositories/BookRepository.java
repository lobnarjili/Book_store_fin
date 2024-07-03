package com.example.bookstore.dao.repositories;

import java.util.List;
import java.util.Optional;

import org.springdoc.core.converters.models.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bookstore.dao.entites.Book;

@Repository

public interface BookRepository  extends JpaRepository<Book, Long> {
    // Optional<Book> findByCode(String code);
    // List<Book> findAllByOrderByPrixAsc();
    // List<Book> findByCategoryId(Long categoryId);


    Optional<Book> findByCode(String code);
    List<Book> findByCategoryId(Long categoryId);
    List<Book> findByNameContainingIgnoreCase(String name);
    List<Book> findAll(Sort sort);
}
