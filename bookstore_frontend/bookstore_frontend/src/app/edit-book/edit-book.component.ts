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
      this.book = new Book(null,'','',0,'','',0,''); ; // Nouvelle catégorie vide pour l'ajout
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
}
