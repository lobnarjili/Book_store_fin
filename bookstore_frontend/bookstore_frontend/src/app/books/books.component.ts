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
    throw new Error('Method not implemented.');
  }
onAddBook() {
  this.router.navigateByUrl('/books/edit/-1')
}

}
