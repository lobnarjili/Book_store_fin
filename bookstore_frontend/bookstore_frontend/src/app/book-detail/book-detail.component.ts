import { Component, Inject, OnInit } from '@angular/core';
import { Book } from '../shared/book';
import { BookService } from '../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book: Book | undefined;
  idbook: any;
  constructor(private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject('BaseURL') public baseURL:any) { }

  ngOnInit(): void {
    //snapshot
    //this.idbook=this.route.snapshot.params['id'];
    //Asynchrone avec RxJS
    this.route.paramMap.subscribe(
      res => {
        this.idbook = res.get('id');
        this.bookService.getBookById(this.idbook).subscribe(
          (book) => { this.book = book }
        );
      }
    )

  }

  onBooks() {
    this.router.navigateByUrl("/books")
  }
}