import { Component, Inject, OnInit } from '@angular/core';
import { Category } from '../shared/category';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent  implements OnInit {

  category: Category | undefined;
  idCategory: any;
  constructor(private contactService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject('BaseURL') public baseURL:any) { }

  ngOnInit(): void {
    //snapshot
    //this.idContact=this.route.snapshot.params['id'];
    //Asynchrone avec RxJS
    this.route.paramMap.subscribe(
      res => {
        this.idCategory = res.get('id');
        this.contactService.getCategoryById(this.idCategory
        ).subscribe(
          (category) => { this.category = category }
        );
      }
    )

  }



}
