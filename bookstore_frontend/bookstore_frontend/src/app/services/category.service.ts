import { Inject, Injectable } from '@angular/core';
import { Category } from '../shared/category';
import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { CATEGORIES } from '../shared/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[] = CATEGORIES;
  httpOptions={
    headers:new HttpHeaders({'content-type':'application/json'})
  }

  constructor( private httpClient: HttpClient,
               @Inject('BaseURL') private baseURL:any,
               private processHttpmsgService:ProcessHttpmsgService
              ) { }

 /* getContacts(): Contact[] {
    return this.contacts;
  }*/
    getCategories(): Observable<Category[]> {
      return this.httpClient.get<Category[]>(this.baseURL+"/categories").pipe(
          catchError(this.processHttpmsgService.handleError)
      ) ;
    }

/*   getContactById(id: number): Contact | undefined {
    return this.contacts.find(contact => contact.id == id);
  } */
    getCategoryById(id: number): Observable<Category> {
      return this.httpClient.get<Category>(this.baseURL+"/categories/"+id);
    }
/*   deleteContactById(id: number): void {
    let index = this.contacts.findIndex(contact => contact.id === id);
    if (index != -1) {
      this.contacts.splice(index, 1);
    }
  } */
    deleteCategoryById(id: number): Observable<any> {
      return this.httpClient.delete<any>(this.baseURL+"/categories/"+id)
    } 

/*   addContact(contact:Contact){
      contact.id=this.contacts[(this.contacts.length-1)].id+1
      this.contacts.push(contact);
  } */
      addCategory(category:Category):Observable<Category>{ 
       return this.httpClient.post<Category>(this.baseURL+'/categories',category,this.httpOptions)
      }

      updateCategory(category:Category):Observable<Category>{ 
        return this.httpClient.put<Category>(this.baseURL+'/categories/'+category.id,category,this.httpOptions)
       }
 

}
