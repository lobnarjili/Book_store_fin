package com.example.bookstore.business.services;

import java.util.List;
import java.util.Optional;

import com.example.bookstore.dao.entites.Category;

public interface ICategoryService {
        List<Category> getAllCategories();
        Category getCategoryById(Long id);
        Category createCategory(Category category);
        Category updateCategory(Long id,Category category);
        void deleteCategoryById(Long id);
}
    