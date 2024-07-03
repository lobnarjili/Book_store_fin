package com.example.bookstore.web.dto;

import com.example.bookstore.dao.entites.Category;

import lombok.Builder;

@Builder

public record CategorySummaryDTO(
        Long id,
        String name
        
    ) {
        public static  CategorySummaryDTO toCategorySummaryDTO(Category category) {
            CategorySummaryDTO  categorySummaryDTO = CategorySummaryDTO.builder()
                    .id(category.getId())
                    .name(category.getName())
                    // .featured(contact.isFeatured())
                    .build();
            return categorySummaryDTO ;
            //Without Builder
         /*  return new ContactSummaryDTO(contact.getId(), contact.getName(),
             contact.isFeatured());*/
        }
    }
    