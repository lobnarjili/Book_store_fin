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
    CategoryDTO categorieDTO,
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
            CategoryDTO.toCategoryDTO(book.getCategory()),
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
            .category(CategoryDTO.fromCategoryDTO(bookDTO.categorieDTO()))
            .description(bookDTO.description())
            .build();
    }
}
