package com.example.bookstore.web.dto;

import com.example.bookstore.dao.entites.Book;

import lombok.Builder;

@Builder
public record BookSummaryDTO(
    Long id,
    String name
) {
    public static BookSummaryDTO toBookSummaryDTO(Book book) {
        return new BookSummaryDTO(
            book.getId(),
            book.getNom()
        );
    }
}

