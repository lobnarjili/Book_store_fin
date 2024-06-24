import { Component, Inject, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit{

 book: Book = new Book(null,'','',0,'','',0,''); 
 isLoading: boolean = false;
 errMail: string = '';
 progress = 0;
 message = '';

 constructor(
  private router: Router,
  private bookService:BookService,
  private route: ActivatedRoute,
  @Inject('BaseURL') public baseUrl: string
) {}
ngOnInit(): void {
  this.route.paramMap.subscribe(result => {
    let id = result.get('id');
    if (id !== '-1') {
      this.initBook(id);
    } else {
      this.book = new Book(null,'','',0,'','',0,''); ;
    }
  });
}

initBook(id: any) {
  this.bookService.getBookById(id).subscribe(
    book => {
      this.book = book;
    },
    error => {
      console.error('Error fetching Book:', error);
    }
  );
}

onSubmit() {
  this.isLoading = true;

  if (this.book.id == null) {
    // Ajout d'une nouvelle catégorie
    this.bookService.addBook(this.book).subscribe({
      next: (newBook:Book) => {
        this.errMail = '';
        this.router.navigateByUrl('/books'); // Redirection vers la liste des catégories après ajout
      },
      error: (err) => {
        this.errMail = err.message || 'Failed to add book.';
        console.error('Error adding book:', err);
        this.isLoading = false;
      }
    });
  } else {

    this.bookService.updateBook(this.book).subscribe({
      next: (updatedBook: Book) => {
        this.errMail = '';
        this.router.navigateByUrl('/books'); // Redirection vers la liste des catégories après mise à jour
      },
      error: (err) => {
        this.errMail = err.message || 'Failed to update book.';
        console.error('Error updating book:', err);
        this.isLoading = false;
      }
    });
  }
}
}

