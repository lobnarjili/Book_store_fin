import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User | undefined;
  iduser: any;
  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject('BaseURL') public baseURL:any) { }

  ngOnInit(): void {

    //Asynchrone avec RxJS
    this.route.paramMap.subscribe(
      res => {
        this.iduser = res.get('id');
        this.userService.getUserById(this.iduser).subscribe(
          (user) => { this.user = user }
        );
      }
    )

  }

  onUsers() {
    this.router.navigateByUrl("/users")
  }
}
