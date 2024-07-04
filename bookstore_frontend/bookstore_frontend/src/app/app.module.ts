import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { HomeComponent } from './home/home.component';
import { BaseURL } from './shared/baseurl';
import { SigninComponent } from './signin/signin.component';
import { CategoryComponent } from './category/category.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { AboutComponent } from './about/about.component';
import { CategoriesComponent } from './categories/categories.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { EditBookComponent } from './edit-book/edit-book.component';
// import { NavbarComponent } from './layout/navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { HttpInterceptor } from './services/http.interceptor';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [
    AppComponent,
    EditCategoryComponent,
    HomeComponent,
    SigninComponent,
    CategoryComponent,
    CategoryDetailComponent,
    AboutComponent,
    CategoriesComponent,
    BooksComponent,
    BookDetailComponent,
    EditBookComponent,
    // NavbarComponent,
    SignupComponent,
    AdminComponent,
    UsersComponent,
    UserDetailComponent,
    EditUserComponent,
 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true },
    { provide: 'BaseURL', useValue: BaseURL }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
