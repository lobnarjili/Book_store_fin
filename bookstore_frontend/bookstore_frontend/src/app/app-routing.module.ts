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
import { AdminComponent } from './admin/admin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path:'',canActivate:[authGuard], data: {roles: ['ROLE_ADMIN','ROLE_USER']}, component: HomeComponent,pathMatch:'full' },
  // { path: 'about',canActivate:[authGuard], component: AboutComponent },
  { path: 'categories',canActivate:[authGuard], data: {roles: ['ROLE_ADMIN']}, component: CategoriesComponent },
  { path: 'categories/edit/:id',canActivate:[authGuard], data: {roles: ['ROLE_ADMIN']}, component:EditCategoryComponent },
  { path: 'categories/:id',canActivate:[authGuard], data: {roles: ['ROLE_ADMIN']}, component:  CategoryDetailComponent },
  // data: {roles: ['ROLE_ADMIN','ROLE_USER']},
   { path: 'books',canActivate:[authGuard],data: {roles: ['ROLE_ADMIN','ROLE_USER']}, component: BooksComponent },
   { path: 'books/edit/:id',canActivate:[authGuard], data: {roles: ['ROLE_ADMIN','ROLE_USER']},component:EditBookComponent},
   { path: 'books/:id',canActivate:[authGuard],data: {roles: ['ROLE_ADMIN','ROLE_USER']},component:  BookDetailComponent },
   {path:'admin', canActivate:[authGuard], data: {roles: ['ROLE_ADMIN']},component:AdminComponent},
// { path: 'signin', component: SigninComponent },
{path:'signin',component:SigninComponent},
{path:'signup',component:SignupComponent},
  // { path: '/about', component: AboutComponent },
  {path:'about',canActivate: [authGuard],data: {roles: ['ROLE_ADMIN','ROLE_USER']},component:AboutComponent},
  // { path: '**', redirectTo: '/categories' } 
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
