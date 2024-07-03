package com.example.bookstore.web.dto;

import com.example.bookstore.dao.entites.Category;

import lombok.Builder;

@Builder

public record CategoryDTO(
        Long id,
        String name) {

    public static CategoryDTO toCategoryDTO(Category category) {
        CategoryDTO categoryDTO = CategoryDTO.builder()
                .id(category.getId())
                .name(category.getName())
                .build();
        return categoryDTO;

    }
//transformer un objet category en un objet categorydto
    public static Category fromCategoryDTO(CategoryDTO categoryDTO) {
       Category category = Category.builder()
                .id(categoryDTO.id)
                .name(categoryDTO.name)
                .build();
        return category;
          //Without builder
    
    //  return new Category(categoryDTO.id, categoryDTO.name);
    

    }
}