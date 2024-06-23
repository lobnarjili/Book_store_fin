import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/category';
import { Router } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  categories!:Category[]
  errMsg!:string
  isWaiting:boolean=false;
  isWaitingDelete:boolean=false;
  constructor(private router:Router,private categoryService:CategoryService){}
  ngOnInit(): void {
  // this.contacts=this.contactService.getContacts();
   //Observer
  this.categoryService.getCategories().subscribe(
    {
      next:(categories:Category[])=>{this.categories=categories;this.isWaiting=false; this.errMsg=""},
      error:(err)=>{this.categories=[],this.isWaiting=false; this.errMsg=err}
    }
  )
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
  onAbout(){
  //  window.location.href = 'https://www.google.tn/maps/@34.6113892,8.7590835,6z?hl=fr';
    this.router.navigate(['/about']);
  //this.router.navigateByUrl('/about?name=demo');
  }
  onAddCategory(){
    this.router.navigateByUrl('/categories/edit/-1')
  }
}