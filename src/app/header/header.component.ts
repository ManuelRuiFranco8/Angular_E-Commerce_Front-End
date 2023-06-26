import { Component } from '@angular/core';
import { UserAuthenticationService } from '../_services/user-authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private userAuth: UserAuthenticationService,
    private router: Router,
    private serv: UserService) {}

  public isLoggedIn() { //returns true if the current user is logged in, false otherwise.
    return this.userAuth.isLoggedIn();
  }

  public logOut() { //user logout operations
    this.userAuth.clear(); //local storage is cleared (role and token of the current user)
    this.router.navigate(['/']); //current user is redirected to the initial page
  }

  public roleMatch(allowed: [String]) { //returns true if the current user's role is allowed for that request
    return this.serv.roleMatch(allowed);
  }

  public isAdmin() { //returns true if the current user in an administrator
    return this.userAuth.isAdmin();
  }

  public isUser() { //returns true if the current user in NOT an administrator
    return this.userAuth.isUser();
  }
}
