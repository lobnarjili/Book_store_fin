import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../shared/book';
import { Category } from '../shared/category';
import { BookService } from '../services/book.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  book: Book = {
    id: null,
    name: '',
    auteur: '',
    prix: 0,
    description: '',
    code: '',
    image: '',
    categorieById: 0
  };
  
  isLoading: boolean = false;
  error: string = '';
  categories: Category[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private categoryService: CategoryService,
    @Inject('BaseURL') public baseUrl: string

  ) {}

  ngOnInit(): void {
    this.getCategories(); // Fetch categories data
    this.route.paramMap.subscribe(params => { // Subscribe to route parameter changes
      const id = params.get('id'); // Get the 'id' parameter from the route
      if (id !== null) { // Check if 'id' parameter exists
        const parsedId = +id; // Parse 'id' to a number
        if (!isNaN(parsedId)) { // Check if 'parsedId' is a valid number
          this.bookService.getBookById(parsedId).subscribe( // Fetch book details by 'id'
            book => {
              this.book = book; // Assign fetched book details to component property
            },
            error => {
              console.error('Error fetching book:', error); // Log error if book fetch fails
            }
          );
        } else {
          console.error('Invalid ID:', id); // Log error if 'id' parameter is not a valid number
        }
      } else {
        console.error('ID not found in params.'); // Log error if 'id' parameter is not present
      }
    });
  }
  
  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      categories => {
        this.categories = categories;
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  onSubmit(): void {
    this.isLoading = true;

    if (this.book.id === null) {
      // Ajout d'un nouveau livre
      this.bookService.addBook(this.book).subscribe({
        next: (newBook: Book) => {
          this.error = '';
          this.router.navigateByUrl('/books'); // Redirection vers la liste des livres après ajout
        },
        error: (err) => {
          this.error = err.message || 'Failed to add book.';
          console.error('Error adding book:', err);
          this.isLoading = false;
        }
      });
    } else {
      // Mise à jour d'un livre existant
      this.bookService.updateBook(this.book).subscribe({
        next: (updatedBook: Book) => {
          this.error = '';
          this.router.navigateByUrl('/books'); // Redirection vers la liste des livres après mise à jour
        },
        error: (err) => {
          this.error = err.message || 'Failed to update book.';
          console.error('Error updating book:', err);
          this.isLoading = false;
        }
      });
    }
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    // Ajoutez ici la logique pour gérer l'upload de l'image
    console.log('Selected image:', file);
  }
 
}
