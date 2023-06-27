import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { UserAuthenticationService } from '../_services/user-authentication.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { EMPTY, catchError, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMex: String="";

  constructor(
    private userService: UserService,
    private userAuth: UserAuthenticationService,
    private router: Router) { }

    login(loginForm: NgForm) {
      this.userService.login(loginForm.value).subscribe(
        (response: any)=>{
          this.userAuth.setToken(response.jwtToken); //saves current user's token into the local storage
          this.userAuth.setRoles(response.user.roles); //saves current user's role into the local storage
          const role=response.user.roles[0].type;
          if(role==='ADMIN') {
            this.router.navigate(['/admin']); //redirection if the role is ADMIN
          } else {
            this.router.navigate(['/user']); //redirection if the role is USER
          }
        },
        (error)=>{
          console.log(error);
          this.errorMex=error.error;
          console.log(this.errorMex);
        }
      );
    }

    badCredentials(): boolean {
      return this.errorMex.length>0;
    }

    tryAgain() {
      this.errorMex="";
    }

    registerNewUser() {
      this.router.navigate(['/registerNewUser']);
    }
}
