import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private isAuth: boolean = false;
    authSubject:Subject<boolean>=new Subject<boolean>();
    constructor() { }
    
    emitAuthSubject(){
      this.authSubject.next(this.isAuthenticated())
    }
    isAuthenticated(): boolean {
      return this.isAuth;
    }
  
    signIn() {
      this.isAuth = true;
      this.emitAuthSubject();
    }
    signOut() {
      this.isAuth = false;
      this.emitAuthSubject();
    }
  }
