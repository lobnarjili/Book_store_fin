package com.example.bookstore;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.bookstore.business.services.FilesStorageService;
import com.example.bookstore.dao.repositories.BookRepository;

import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@Slf4j
public class BookstoreApplication implements CommandLineRunner {
	@Resource
	BookRepository bookRepository;
	@Resource 
	FilesStorageService filesStorageService;
	public static void main(String[] args) {
		SpringApplication.run(BookstoreApplication.class, args);
		System.out.println("Hi");
	}
	@Override
	public void run(String... args) throws Exception {
		log.info("Storage initialisation");
		filesStorageService.init();
	}
}
 