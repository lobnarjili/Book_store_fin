import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';
import { CategoryComponent } from './category/category.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { AboutComponent } from './about/about.component';
import { CategoriesComponent } from './categories/categories.component';
import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { EditBookComponent } from './edit-book/edit-book.component';

const routes: Routes = [
  { path: '',canActivate:[authGuard], component: HomeComponent,pathMatch:'full' },
  // { path: 'about',canActivate:[authGuard], component: AboutComponent },
  { path: 'categories',canActivate:[authGuard], component: CategoriesComponent },
  { path: 'categories/edit/:id',canActivate:[authGuard], component:EditCategoryComponent },
  { path: 'categories/:id',canActivate:[authGuard], component:  CategoryDetailComponent },
  
   { path: 'books',canActivate:[authGuard], component: BooksComponent },
   { path: 'books/edit/:id',canActivate:[authGuard], component:EditBookComponent},
   { path: 'books/:id',canActivate:[authGuard], component:  BookDetailComponent },

{ path: 'signin', component: SigninComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '/categories' } 
  // { path: '**', component: NotFoundComponent }
  // { path: 'categories', component: CategoryComponent },
  // { path: 'categories/:id', component: CategoryDetailComponent },
  // { path: 'categories/edit/:id', component: EditCategoryComponent },
  // { path: 'signin', component: SigninComponent },
  // { path: 'about', component: AboutComponent },
  // { path: '**', redirectTo: '/categories' } 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
