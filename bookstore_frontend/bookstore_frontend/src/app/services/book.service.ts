import { Inject, Injectable } from '@angular/core';
import { Book } from '../shared/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { Observable, catchError } from 'rxjs';
import { BOOKS } from '../shared/books';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  [x: string]: any;

  books: Book[] = BOOKS;
  httpOptions={
    headers:new HttpHeaders({'content-type':'application/json'}),
    withCredentials: true

  }

  constructor( private httpClient: HttpClient,
               @Inject('BaseURL') private baseURL:any,
               private processHttpmsgService:ProcessHttpmsgService
              ) { }

 /* getContacts(): Contact[] {
    return this.contacts;
  }*/
    getBooks(): Observable<Book[]> {
      return this.httpClient.get<Book[]>(this.baseURL+"/books",{ withCredentials: true}).pipe(
          catchError(this.processHttpmsgService.handleError)
      ) ;
    }

/*   getContactById(id: number): Contact | undefined {
    return this.contacts.find(contact => contact.id == id);
  } */
    getBookById(id: number): Observable<Book> {
      return this.httpClient.get<Book>(this.baseURL+"/books/"+id,{ withCredentials: true});
    }
/*   deleteContactById(id: number): void {
    let index = this.contacts.findIndex(contact => contact.id === id);
    if (index != -1) {
      this.contacts.splice(index, 1);
    }
  } */
    deleteBookById(id: number): Observable<any> {
      return this.httpClient.delete<any>(this.baseURL+"/books/"+id,{ withCredentials: true})
    } 

/*   addContact(contact:Contact){
      contact.id=this.contacts[(this.contacts.length-1)].id+1
      this.contacts.push(contact);
  } */
      addBook(book:Book):Observable<Book>{ 
       return this.httpClient.post<Book>(this.baseURL+'/books',book,this.httpOptions)
      }

      updateBook(book:Book):Observable<Book>{ 
        return this.httpClient.put<Book>(this.baseURL+'/books/'+book.id,book,this.httpOptions)
       }
 
       getBooksByCategoryId(categoryId: number): Observable<Book[]> {
        return this.httpClient.get<Book[]>(`${this.baseURL}/category/${categoryId}`);
      }
}