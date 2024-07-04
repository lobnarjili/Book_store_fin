import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit,OnDestroy {

  users!:User[]
   errMsg!:string
   isWaiting:boolean=false;
   isWaitingDelete:boolean=false;
   showAdminFn = false;
   showUserFn = false;
 
   authUserSub!: Subscription;
   constructor(
     private router:Router,
     private userService:UserService,
     private authService: AuthService
   ){}
   ngOnInit(): void {
     this.userService.getUsers().subscribe(
       {
         next: (users: User[]) => { this.users = users; this.isWaiting = false; this.errMsg = "" },
         error: (err) => { this.users = [], this.isWaiting = false; this.errMsg = err }
       }
     )

         // Subscribe to the AuthenticatedUser$ observable
   this.authUserSub=this.authService.AuthenticatedUser$.subscribe({
     next: user => {
       // If user is authenticated
       if (user) {
         // Show admin Fn if user has admin role
         this.showAdminFn = user.role.name === 'ROLE_ADMIN' ;
      
         
         console.log(this.showAdminFn);

       } else {
         this.showAdminFn = false;
   
       }
     }
   })
   }

 onDelete(id: number) {
   this.isWaitingDelete = true
   this.userService.deleteUserById(id).subscribe(
     {
       next: (res: any) => {
         this.isWaitingDelete = false
         let index = this.users.findIndex(user => user.id === id);
         if (index != -1) {
           this.users.splice(index, 1);
         }
       }
     }
   );

 }

onAddUser() {
 this.router.navigateByUrl('/signup')
}
ngOnDestroy(): void {
 // Unsubscribe from the AuthenticatedUser$ observable to prevent memory leaks
 this.authUserSub.unsubscribe();
}

}