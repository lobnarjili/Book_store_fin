package com.example.bookstore.web.dto;

import com.example.bookstore.dao.entites.Book;

import lombok.Builder;
@Builder
public record BookDTO(
    Long id,
    String code,
    String name,
    Double prix,
    String auteur,
    String image,
    Long categoryId,
    String description
) {
    public static BookDTO toBookDTO(Book book) {
        return new BookDTO(
            book.getId(),
            book.getCode(),
            book.getNom(),
            book.getPrix(),
            book.getAuteur(),
            book.getImage(),
            // CategoryDTO.toCategoryDTO(book.getCategory()),
      
            book.getCategory().getId(),
            book.getDescription()
        );
    }

    public static Book fromBookDTO(BookDTO bookDTO) {
        return Book.builder()
            .id(bookDTO.id())
            .code(bookDTO.code())
            .nom(bookDTO.name())
            .prix(bookDTO.prix())
            .auteur(bookDTO.auteur())
            .image(bookDTO.image())
            .category(null)
            .description(bookDTO.description())
            .build();
    }
}
