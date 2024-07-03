package com.example.bookstore.business.servicesImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bookstore.business.services.ICategoryService;
import com.example.bookstore.dao.entites.Category;
import com.example.bookstore.dao.repositories.CategoryRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CategoryServiceImpl implements ICategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    // public Optional<Category> getCategoryById(Long id) {
    //     return categoryRepository.findById(id);
    // }
      public Category getCategoryById(Long id) {
        // Check if the ID is null and throw an IllegalArgumentException if it is
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        // Retrieve the contact by ID, throw an EntityNotFoundException if not found
        return this.categoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Category with id: " + id + " not found"));
    }


    @Override
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Long id,Category category) {
        if (id == null ||  category == null) {
            throw new IllegalArgumentException("ID or Category cannot be null");
        }
    // Verify the existence of the contact
    getCategoryById(id);

        return categoryRepository.save(category);
    }

    @Override
    public void deleteCategoryById(Long id) {
        if (id==null){
        throw new IllegalArgumentException("ID or Category cannot be null");
    }this.getCategoryById(id);
        categoryRepository.deleteById(id);
    }

    public CategoryRepository getCategoryRepository() {
        return categoryRepository;
    }

    public void setCategoryRepository(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
}
