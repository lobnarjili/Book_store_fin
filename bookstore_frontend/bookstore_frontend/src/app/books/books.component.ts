import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent 
  implements OnInit,OnDestroy {

   books!:Book[]
    errMsg!:string
    isWaiting:boolean=false;
    isWaitingDelete:boolean=false;
    showAdminFn = false;
    showUserFn = false;
  
    authUserSub!: Subscription;
    constructor(
      private router:Router,
      private bookService:BookService,
      private authService: AuthService,
      @Inject('BaseURL') public baseURL:any) { }
    ngOnInit(): void {
      this.bookService.getBooks().subscribe(
        {
          next: (books: Book[]) => { this.books = books; this.isWaiting = false; this.errMsg = "" },
          error: (err) => { this.books = [], this.isWaiting = false; this.errMsg = err }
        }
      )

          // Subscribe to the AuthenticatedUser$ observable
    this.authUserSub=this.authService.AuthenticatedUser$.subscribe({
      next: user => {
        // If user is authenticated
        if (user) {
          // Show admin Fn if user has admin role
          this.showAdminFn = user.role.name === 'ROLE_ADMIN' ;
          this.showUserFn = user.role.name === 'ROLE_USER' ;
          
          console.log(this.showAdminFn);

        } else {
          this.showAdminFn = false;
          this.showUserFn = false;
        }
      }
    })
    }


  onDelete(id: number) {
    this.isWaitingDelete = true
    this.bookService.deleteBookById(id).subscribe(
      {
        next: (res: any) => {
          this.isWaitingDelete = false
          let index = this.books.findIndex(book => book.id === id);
          if (index != -1) {
            this.books.splice(index, 1);
          }
        }
      }
    );

  }
  getBooksByCategory(categoryId: number) {
    this.isWaiting = true;
    this.bookService.getBooksByCategoryId(categoryId).subscribe({
      next: (books: Book[]) => {
        this.books = books;
        this.isWaiting = false;
        this.errMsg = '';
      },
      error: (err) => {
        this.books = [];
        this.isWaiting = false;
        this.errMsg = err;
      }
    });
  }
onAddBook() {
 console.log("emchi bras omek ")
  this.router.navigateByUrl('/books/edit/-1')
}
ngOnDestroy(): void {
  // Unsubscribe from the AuthenticatedUser$ observable to prevent memory leaks
  this.authUserSub.unsubscribe();
 }

}
