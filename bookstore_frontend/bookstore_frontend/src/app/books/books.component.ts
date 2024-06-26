import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent 
  implements OnInit{

   books!:Book[]
    errMsg!:string
    isWaiting:boolean=false;
    isWaitingDelete:boolean=false;
    constructor(private router:Router,private bookService:BookService){}
    ngOnInit(): void {
      this.bookService.getBooks().subscribe(
        {
          next: (books: Book[]) => { this.books = books; this.isWaiting = false; this.errMsg = "" },
          error: (err) => { this.books = [], this.isWaiting = false; this.errMsg = err }
        }
      )
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

onAddBook() {
 console.log("emchi bras omek ")
  this.router.navigateByUrl('/books/edit/-1')
}

}
