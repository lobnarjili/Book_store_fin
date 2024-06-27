package com.example.bookstore.dao.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bookstore.dao.entites.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {}
