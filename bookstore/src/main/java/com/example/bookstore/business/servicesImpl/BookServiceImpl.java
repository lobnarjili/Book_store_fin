package com.example.bookstore.business.servicesImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.example.bookstore.business.services.BookService;
import com.example.bookstore.business.services.FilesStorageService;
import com.example.bookstore.business.services.ICategoryService;
import com.example.bookstore.dao.entites.Book;
import com.example.bookstore.dao.repositories.BookRepository;
import com.example.bookstore.exceptions.DuplicateBookException;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookRepository bookRepository;
    private final FilesStorageService filesStorageService;
    @Autowired
    private ICategoryService iCategoryService;


    public BookServiceImpl(BookRepository bookRepository,
                              FilesStorageService filesStorageService) {
        this.bookRepository =  bookRepository;
        this.filesStorageService = filesStorageService;
    
                              }
    @Override
    public List<Book> getBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Book getBookById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        return this.bookRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("BOOK with id: " + id + " not found"));
    }

    // @Override
    // public Optional<Book> getBookByCode(String code) {
    // return bookRepository.findByCode(code);
    // }

    // @Override
    // public List<Book> getAllBooksSortedByPrice() {
    // return bookRepository.findAllByOrderByPrixAsc();
    // }

    @Override
    public Book createBook(Book book,Long id) throws DuplicateBookException {

        if (book == null) {
            throw new IllegalArgumentException(" Book cannot be null");
        }
        try{
            book.setCategory(iCategoryService.getCategoryById(id));
        }catch (Exception e) {
            // Handle uniqueness constraint violations
            try {
                throw new Exception( "A book with the same code or other unique field already exists.");
            } catch (Exception e1) {
              
                e1.printStackTrace();
            }
        };
        
        try {
            return bookRepository.save(book);
        } catch (DataIntegrityViolationException e) {
            // Handle uniqueness constraint violations
            throw new DuplicateBookException(
                    "A book with the same code or other unique field already exists.");
        }
    }

    @Override
    public Book updateBook(Long id, Book book,Long categoryId) throws DuplicateBookException {
        if (id == null || book == null) {
            throw new IllegalArgumentException("ID or Book cannot be null");
        }
        // Verify the existence
        getBookById(id);
        try{
            book.setCategory(iCategoryService.getCategoryById(id));
        }catch (Exception e) {
            // Handle uniqueness constraint violations
            try {
                throw new Exception( "A book with the same code or other unique field already exists.");
            } catch (Exception e1) {
              
                e1.printStackTrace();
            }
        };
        
        try {
            // Save the updated book in the repository
            return bookRepository.save(book);
        } catch (DataIntegrityViolationException e) {
            // Handle uniqueness constraint violations
            throw new DuplicateBookException(
                    "A Book with the same code or other unique field already exists.");
        }
    }

    @Override
    @Transactional
    public void deleteBookById(Long id) {
        if (id==null){
            throw new IllegalArgumentException("ID or Category cannot be null");
        }
        try {
         // Retrieve the by ID
         Book book = this.getBookById(id);
         String filename = book.getImage();
         if (filename != null) {
            filesStorageService.delete(filename);
        }



          // Delete the book from the repository by ID
        bookRepository.deleteById(id);

             } catch (DataAccessException e) {
            // Capture any data access exceptions (e.g., foreign key constraint violations)
            throw new RuntimeException("Failed to delete Book with id: " + id, e);
             }
    }
    @Override
    public Book updateBookImage(Long id, String filename) {
      
            // Check if the ID is null and throw an IllegalArgumentException if it is
            if (id == null) {
                throw new IllegalArgumentException("ID cannot be null");
            }
          
            // Retrieve the Book by ID, throw an EntityNotFoundException if the Book
            // is not found
            Book book = getBookById(id);
    
            // Check if the Book already has an image
            if (book.getImage() == null) {
                // If the Book does not have an image, set the new image
                book.setImage(filename);
            } else {
                // If the Book already has an image, delete the old image
                this.filesStorageService.delete(book.getImage());
                // Set the new image
                book.setImage(filename);
            }
            // Save and return the updated Book in the repository
            return bookRepository.save(book);
        }
    }

    // @Override
    // public List<Book> getBooksByCategoryId(Long categoryId) {

    //     return bookRepository.findByCategoryId(categoryId);
    // }

