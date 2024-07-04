// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css']
// })
// export class NavbarComponent implements OnInit {
//   isAuth: boolean = false;
//   title = 'bookstore';
//   constructor(private authService: AuthService) { }
//   ngOnInit(): void {
//     //Observer
//     this.authService.authSubject.subscribe(
//       { next: (isAuth: boolean) => { this.isAuth = isAuth } }
//     )
//    this.authService.emitAuthSubject();
//   }
// }


// import { Component, OnInit } from '@angular/core';

// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css']
// })
// export class NavbarComponent implements OnInit {


//   // Indicates if the user is authenticated
//   isAuth: boolean = false;

//   // Shows admin board if user has admin role
//   showAdminBoard = false;
//   title = 'bookstore';

//   // Injecting AuthService and Router into the component
//   constructor(private authService: AuthService, private router:Router) { }

//   // Initialization logic
//   ngOnInit(): void {
//     // Attempt to auto-login the user
//     this.authService.autoLogin();

//     // Subscribe to the AuthenticatedUser$ observable
//     this.authService.AuthenticatedUser$.subscribe({
//       next: user => { 
//         // If user is authenticated
//         if(user) {
//           // Show admin board if user has admin role
//           this.showAdminBoard = user.role.name === 'ROLE_ADMIN';
//           this.isAuth = true;
//         } else {
//           // For sign out
//           this.showAdminBoard=false;
//           this.isAuth = false;
//         }
//       }
//     })
//   }

//   // Sign out logic
//   onSignOut() {
//     this.authService.logout();
//     this.authService.logout();
//   }
// }