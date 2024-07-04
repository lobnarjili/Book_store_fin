import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../shared/user'; // Import User model
import { StorageService } from './storage.service'; // Import StorageService for local storage operations
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpClient and HttpHeaders for HTTP requests
import { AuthResponseData } from '../shared/auth-response-data'; // Import AuthResponseData model
import { Router } from '@angular/router'; // Import Router for navigation
import { RegisterUser } from '../shared/register-user'; // Import RegisterUser model

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  
  AuthenticatedUser$ = new BehaviorSubject<User | null>(null); // BehaviorSubject to hold the authenticated user

  constructor(
    private http: HttpClient, // Inject HttpClient for HTTP requests
    private storageService: StorageService, // Inject StorageService for local storage operations
    private router: Router, // Inject Router for navigation
    @Inject('BaseURL') private baseURL: any, // Inject baseURL for API endpoints
  ) { }

  // Method to log in a user with email and password
  login(email: string, password: string) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Set content type to JSON
        'Authorization': 'Basic ' + window.btoa(email + ':' + password) // Add basic auth header
      }),
      withCredentials: true // Include credentials (cookies) in the request
    };
    
    return this.http.post<AuthResponseData>(this.baseURL + '/auth/signin', null, httpOptions).pipe(
      catchError(err => {
        let errorMessage = 'An unknown error occurred!';
        
       //  if (err.error.message === 'Bad credentials') {
        errorMessage = 'The email address or password you entered is invalid';
       //  }
        return throwError(() => new Error(errorMessage));
      }),
      tap(user => {
        const extractedUser: User = {
          email: user.email,
          id: user.id,
          role: {
            name: user.roles.find(role => role.includes('ROLE')) || '',
            permissions: user.roles.filter(permission => !permission.includes('ROLE'))
          }
        };
        this.storageService.saveUser(extractedUser); // Save user to local storage
        this.AuthenticatedUser$.next(extractedUser); // Update BehaviorSubject with authenticated user
      })
    );
  }
  
  // Method to register a new user
  register(user: RegisterUser) {
    return this.http.post<RegisterUser>(this.baseURL + '/auth/signup', user).pipe(
      catchError(err => {
        let errorMessage = 'An unknown error occurred!';
        if (err.error.message === 'User already exists') {
          errorMessage = 'This email address is already registered';
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  // Method to automatically log in a user if they are already authenticated
  autoLogin() {
    const userData = this.storageService.getSavedUser();
    if (!userData) {
      return;
    }
    this.AuthenticatedUser$.next(userData); // Update BehaviorSubject with authenticated user
  }

  // Method to log out the current user
  logout() {
    this.http.request('post', this.baseURL + '/auth/signout', {
      withCredentials: true // Include credentials (cookies) in the request
    }).subscribe({
      next: () => {
        this.storageService.clean(); // Clear local storage
        this.AuthenticatedUser$.next(null); // Reset authenticated user
        this.router.navigate(['/signin']); // Navigate to the sign-in page
      }
    });
  }
}






//import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//     private isAuth: boolean = false;
//     authSubject:Subject<boolean>=new Subject<boolean>();
//     constructor() { }
    
//     emitAuthSubject(){
//       this.authSubject.next(this.isAuthenticated())
//     }
//     isAuthenticated(): boolean {
//       return this.isAuth;
//     }
  
//     signIn() {
//       this.isAuth = true;
//       this.emitAuthSubject();
//     }
//     signOut() {
//       this.isAuth = false;
//       this.emitAuthSubject();
//     }
//   }
