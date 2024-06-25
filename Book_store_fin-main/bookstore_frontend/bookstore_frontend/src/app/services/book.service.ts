import { Inject, Injectable } from '@angular/core';
import { Book } from '../shared/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BOOKS } from '../shared/books';
import { CategoryService } from './category.service';
import { Category } from '../shared/category';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  books: Book[] = BOOKS;
  categories: Category[] = [];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  categoryById: Category | undefined;

  constructor(
    private httpClient: HttpClient,
    @Inject('BaseURL') private baseURL: any,
    private processHttpmsgService: ProcessHttpmsgService,
    private categoryService: CategoryService
  ) { }

  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.baseURL + "/books").pipe(
      catchError(this.processHttpmsgService.handleError)
    );
  }

  getBookById(id: number): Observable<Book> {
    return this.httpClient.get<Book>(this.baseURL + "/books/" + id).pipe(
      catchError(this.processHttpmsgService.handleError)
    );
  }

  deleteBookById(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.baseURL + "/books/" + id).pipe(
      catchError(this.processHttpmsgService.handleError)
    );
  }

  /*addBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(this.baseURL + '/books', book, this.httpOptions).pipe(
      catchError(this.processHttpmsgService.handleError)
    );
  }*/

    addBook(book: Book): Observable<Book> {
      return this.httpClient.post<Book>(this.baseURL + '/books', book, this.httpOptions).pipe(
        catchError(this.processHttpmsgService.handleError)
      );
    }
    
  updateBook(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(this.baseURL + '/books/' + book.id, book, this.httpOptions).pipe(
      catchError(this.processHttpmsgService.handleError)
    );
  }

  // Méthode pour récupérer les catégories
 /* getCategory(): void {
    this.categoryService.getCategories().subscribe(
      categories => this.categories = categories,
      error => console.error('Error fetching categories:', error)
    );
  }*/
    getCategoryById(id: number){
      this.categoryService.getCategoryById(id).subscribe(
        category => {
          // Assurez-vous d'avoir une propriété categoryById dans votre service pour stocker le résultat
          this.categoryById = category;
        },
        error => console.error('Error fetching category:', error)
      );
    }
}
