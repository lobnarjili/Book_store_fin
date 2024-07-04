package com.example.bookstore.web.dto;

import com.example.bookstore.dao.entites.Book;
import com.example.bookstore.dao.entites.Category;

import lombok.Builder;

@Builder
public record BookSummaryDTO(
    Long id,
    String name,
    Long categoryId 
) {
    public static BookSummaryDTO toBookSummaryDTO(Book book) {
        return new BookSummaryDTO(
            book.getId(),
            book.getNom(),
            book.getCategory().getId()
        );
    }
}

