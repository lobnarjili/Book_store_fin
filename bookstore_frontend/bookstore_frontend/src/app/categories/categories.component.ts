import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../shared/category';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit ,OnDestroy {
isLoading: any;
Category: any;
onSubmit() {
throw new Error('Method not implemented.');
}

categories !:Category[]
isWaitingDelete:boolean=false;
isWaiting:boolean=true;
 // Shows admin functions if user has admin role
 showAdminFn = false;
 authUserSub!: Subscription;  // Subscription to the authenticated user observable
errMsg!:string
constructor(private router:Router,private categoryService:CategoryService , private authService: AuthService){}
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      {
        next:(categories:Category[])=>{this.categories=categories;this.isWaiting=false; this.errMsg=""},
        error:(err)=>{this.categories=[],this.isWaiting=false; this.errMsg=err}
      }
    )
    


    // Subscribe to the AuthenticatedUser$ observable
    this.authUserSub=this.authService.AuthenticatedUser$.subscribe({
      next: user => {
        // If user is authenticated
        if (user) {
          // Show admin Fn if user has admin role
          this.showAdminFn = user.role.name === 'ROLE_ADMIN';
          console.log(this.showAdminFn);

        } else {
          this.showAdminFn = false;
        }
      }
    })
  }



  onAddCategory(){
    this.router.navigateByUrl('/categories/edit/-1')
  }
onDelete(id:number){
  this.isWaitingDelete=true
  this.categoryService.deleteCategoryById(id).subscribe(
    {
      next:(res:any)=>{  
        this.isWaitingDelete=false
        let index = this.categories.findIndex(category => category.id === id);
        if (index != -1) {
          this.categories.splice(index, 1);
        }}
    }
  );

}
ngOnDestroy(): void {
  // Unsubscribe from the AuthenticatedUser$ observable to prevent memory leaks
  this.authUserSub.unsubscribe();
 }
}