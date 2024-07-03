import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin', 
  templateUrl: './signin.component.html', 
  styleUrls: ['./signin.component.css'] 
})
export class SigninComponent implements OnInit, OnDestroy {

  errorMessage!: string; // Variable to store error messages
  AuthUserSub!: Subscription; // Subscription to the authenticated user observable

  // Inject AuthService and Router in the constructor
  constructor(private authService: AuthService, private router: Router) { }

  // Lifecycle hook that is called after Angular has initialized all data-bound properties
  ngOnInit() {
    // Subscribe to the AuthenticatedUser$ observable to monitor authentication state
    this.AuthUserSub = this.authService.AuthenticatedUser$.subscribe({
      next: user => {
        // If a user is authenticated, navigate to the home page
        if (user) {
          this.router.navigate(['/']);
        }
      }
    });
  }

  // Method to handle the sign-in form submission
  onSubmitSingin(formLogin: NgForm) {
    // Validate the form
    if (!formLogin.valid) {
      return;
    }

    const email = formLogin.value.email; // Get email from the form
    const password = formLogin.value.password; // Get password from the form

    // Call the login method from AuthService
    this.authService.login(email, password).subscribe({
      next: userData => {
        // On successful login, navigate to the home page
        this.router.navigate(['/']);
      },
      error: err => {
        // On error, set the error message and log it to the console
        this.errorMessage = err;
      }
    });
  }

  // Lifecycle hook that is called when the component is destroyed
  ngOnDestroy() {
    // Unsubscribe from the AuthenticatedUser$ observable to prevent memory leaks
    this.AuthUserSub.unsubscribe();
  }
}


// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-signin',
//   templateUrl: './signin.component.html',
//   styleUrls: ['./signin.component.css']
// })
// export class SigninComponent implements OnInit {
//   isAuth: boolean = false;
//   constructor(private authService: AuthService) {

//   }
//   ngOnInit(): void {
//     this.isAuth = this.authService.isAuthenticated();
//   }
//   onSigIn(): void {
//     this.authService.signIn();
//     this.isAuth=this.authService.isAuthenticated();
//   }
//   onSignOut(): void {
//     this.authService.signOut();
//     this.isAuth=this.authService.isAuthenticated();
//   }
// }