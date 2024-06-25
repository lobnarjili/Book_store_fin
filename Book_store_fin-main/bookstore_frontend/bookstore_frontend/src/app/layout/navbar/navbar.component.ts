import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAuth: boolean = false;
  title = 'bookstore';
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    //Observer
    this.authService.authSubject.subscribe(
      { next: (isAuth: boolean) => { this.isAuth = isAuth } }
    )
   this.authService.emitAuthSubject();
  }
  isCollapsed = false; // initialiser la propriété isCollapsed

}
