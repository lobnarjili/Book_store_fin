import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { User } from '../shared/user';
import { USERS } from '../shared/users';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 users: User[] = USERS;
  httpOptions={
    headers:new HttpHeaders({'content-type':'application/json'}),
    withCredentials: true

  }


  constructor( private httpClient: HttpClient,
    @Inject('BaseURL') private baseURL:any,
    private processHttpmsgService:ProcessHttpmsgService
   ) { }




  deleteUserById(id: number)  : Observable<any> {
    return this.httpClient.delete<any>(this.baseURL+"/users/"+id,{ withCredentials: true})
  } 
  getUsers() :Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseURL+"/users",{ withCredentials: true}).pipe(
        catchError(this.processHttpmsgService.handleError)
    ) ;
  }
  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(this.baseURL+"/users/"+id,{ withCredentials: true});
  }
  updateBook(user:User):Observable<User>{ 
    return this.httpClient.put<User>(this.baseURL+'/books/'+user.id,user,this.httpOptions)
   }

}
