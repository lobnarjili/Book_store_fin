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

import com.example.bookstore.business.services.BookService;
import com.example.bookstore.business.services.ICategoryService;
import com.example.bookstore.dao.entites.Book;
import com.example.bookstore.dao.entites.Category;
import com.example.bookstore.web.dto.BookDTO;
import com.example.bookstore.web.dto.BookSummaryDTO;
import com.example.bookstore.web.dto.CategoryDTO;
import com.example.bookstore.web.dto.CategorySummaryDTO;
import com.example.bookstore.web.models.requests.BookForm;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/*

* Create a Book with Category: POST /books

* Retrieve All Books : GET /books

* Retrieve Book by ID: GET /books/{id}

* Retrieve Book  by Code: GET /books/code/{code}

* Retrieve All Book s Sorted by Price: GET /books/sorted

* Update a Book : PUT /books/{id}

* Delete a Book : DELETE /books/{id}

* Retrieve Books by Category ID: GET /books/category/{categoryId}

 */


@RestController

@RequestMapping("/books")
public class BookController {

     @Autowired
    BookService bookService;

    @Autowired
    ICategoryService categoryService;


        // Create a new book and save it in db
    @PostMapping()
    public ResponseEntity<?> createBook(@RequestBody BookDTO bookDTO) {
   Book book =BookDTO.fromBookDTO(bookDTO);
        return new ResponseEntity<>(this.bookService.createBook(book), HttpStatus.CREATED);
    }
 // Retrieve all books
    @GetMapping()
    public ResponseEntity<?> getBooks() {
      List<BookSummaryDTO> books = this.bookService.getBooks()
    .stream()
    .map(BookSummaryDTO::toBookSummaryDTO)
    .collect(Collectors.toList()); 
    return new ResponseEntity<>(books, HttpStatus.OK);

    }
        // Retrieve book by id
    @GetMapping("/{id}")
    // public ResponseEntity<Object> getBookById(@PathVariable("id") Long id) {
    //     Optional<Book> book = bookService.getBookById(id);
    //     if (book.isPresent()) {
    //         return new ResponseEntity<>(book.get(), HttpStatus.OK);
    //     }
    //     return new ResponseEntity<>("Failed: book not found", HttpStatus.NOT_FOUND);
    // }

    public ResponseEntity<?> getBookById(@PathVariable Long id) {
        BookDTO book =BookDTO.toBookDTO(this.bookService.getBookById(id));
  
             return new ResponseEntity<>(book, HttpStatus.OK);
           }
      // Retrieve book by code
    //   @GetMapping("/code/{code}")
    //   public ResponseEntity<Object> getBookByCode(@PathVariable("code") String code) {
    //       Optional<Book> book = bookService.getBookByCode(code);
    //       if (book.isPresent()) {
    //           return new ResponseEntity<>(book.get(), HttpStatus.OK);
    //       }
    //       return new ResponseEntity<>("Failed: Book not found", HttpStatus.NOT_FOUND);
    //   }

      // Retrieve all books sorted by price in ascending order
    // @GetMapping("/sorted")
    // public ResponseEntity<List<Book>> getAllBooksSortedByPrice() {
    //     return new ResponseEntity<>(bookService.getAllBooksSortedByPrice(), HttpStatus.OK);
    // }

     // Update book by id
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBook(@PathVariable("id") Long id, @RequestBody BookDTO bookDTO) {
        Book book = BookDTO.fromBookDTO(bookDTO);
        bookService.getBookById(id);
        
            return new ResponseEntity<>(this.bookService.updateBook(id,book), HttpStatus.OK);
  
        // return new ResponseEntity<>("Failed: Product not found", HttpStatus.NOT_FOUND);
    }
     // Delete book by id
    @DeleteMapping("/{id}")
    // public ResponseEntity<Object> deleteBook(@PathVariable("id") Long id) {
    //     Optional<Book> book = bookService.getBookById(id);
    //     if (book.isPresent()) {
    //         bookService.deleteBookById(id);
    //         return new ResponseEntity<>("Book deleted successfully", HttpStatus.OK);
    //     }
    //     return new ResponseEntity<>("Failed: Book not found", HttpStatus.NOT_FOUND);
    // }
    public ResponseEntity<Object> deleteCategory(@PathVariable Long id) {
  
        this.bookService.deleteBookById(id);
     
    return new ResponseEntity<>("Book not found", HttpStatus.NO_CONTENT);
}

    // Retrieve all books by category ID
    // @GetMapping("/category/{categoryId}")
    // public ResponseEntity<?> getBooksByCategoryId(@PathVariable("categoryId") Long categoryId) {
     
    //     return new ResponseEntity<>("Failed: Category not found", HttpStatus.NOT_FOUND);
    // }



    
}
