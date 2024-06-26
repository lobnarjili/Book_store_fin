package com.example.bookstore.web.controllers;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bookstore.business.services.ICategoryService;
import com.example.bookstore.dao.entites.Category;
import com.example.bookstore.web.dto.CategoryDTO;
import com.example.bookstore.web.dto.CategorySummaryDTO;

/*

*  Create a Category: POST /categories

*  Retrieve All Categories: GET /categories

*  Retrieve Category by ID: GET /categories/{id}

*  Update a Category: PUT /categories/{id}

* Delete a Category: DELETE /categories/{id}

 */
@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private ICategoryService categoryService;

    // Retrieve All Categories
    @GetMapping()
    public ResponseEntity<?> getAllCategories() {
        List<CategorySummaryDTO> categories = categoryService.getAllCategories()
                .stream()
                .map(CategorySummaryDTO::toCategorySummaryDTO)
                .collect(Collectors.toList());

        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    // Retrieve Category by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable Long id) {
        CategoryDTO category = CategoryDTO.toCategoryDTO(categoryService.getCategoryById(id));
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    // Create a Category
    @PostMapping()
    public ResponseEntity<?> createCategory(@RequestBody CategoryDTO categoryDTO) {
        Category category = CategoryDTO.fromCategoryDTO(categoryDTO);
        return new ResponseEntity<>(this.categoryService.createCategory(category), HttpStatus.CREATED);
    }

    // Update a Category
    @PutMapping("/{id}")
    // @PutMapping("/categories/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @RequestBody CategoryDTO categoryDTO) {
        Category category = CategoryDTO.fromCategoryDTO(categoryDTO);
        categoryService.getCategoryById(id);

        return new ResponseEntity<>(this.categoryService.updateCategory(id, category), HttpStatus.OK);

    }
    // Delete a Category

    @DeleteMapping("/{id}")

    public ResponseEntity<Object> deleteCategory(@PathVariable Long id) {
        this.categoryService.deleteCategoryById(id);
        return new ResponseEntity<>("Category not found", HttpStatus.NO_CONTENT);
    }

}
