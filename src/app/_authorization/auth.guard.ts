import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthenticationService } from '../_services/user-authentication.service';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userAuth: UserAuthenticationService,
    private router: Router,
    private serv: UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.userAuth.getToken()!=null) {
      const role=route.data["roles"] as [String]; //takes the role of the user associated with the token
      if(role) {
        const match=this.serv.roleMatch(role); //checks if the user's role is allowed for the current request
        if(match) {
          return true;
        } else {
          this.router.navigate(['/forbidden']); //if the user is not allowed, redirection to forbidden
          return false;
        }
      }
    }
    this.router.navigate(['/login']); //without token, redirection to login page
    return false;
  }
}
