import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthenticationService } from './user-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_START="http://localhost:8080" //starting endpoint of back-end server

  requestHeader=new HttpHeaders({"No-Auth":"True"}); //header for requests not subjected to authentication

  constructor(
    private httpClient: HttpClient,
    private userAuth: UserAuthenticationService) { }

  public login(loginData: any) { //login method redirects to /authenticate endpoint of back-end server
    return this.httpClient.post(this.PATH_START+"/authenticate", loginData, { headers:this.requestHeader });
  }

  public roleMatch(allowedRoles: [String]) :boolean { //the parameter is the allowed role for that end-point
    let isMatch=false;
    const userRoles: any=this.userAuth.getRoles(); //it takes the role assigned to the current user
    if(userRoles!=null && userRoles) {
      for(let i=0; i<userRoles.length; i++)
        for(let j=0; j<allowedRoles.length; j++)
          if(userRoles[i].type===allowedRoles[j]) { //if the allowed role matches with the current user's roles
            isMatch=true;
            break;
          }
    }
    return isMatch;
  }

  public forAdmin() { //forAdmin method redirects to /forAdmin endpoint of back-end server
    return this.httpClient.get(this.PATH_START+"/forAdmin", {responseType: 'text'});
  }

  public forUser() { //forUser method redirects to /forUser endpoint of back-end server
    return this.httpClient.get(this.PATH_START+"/forUser", {responseType: 'text'});
  }

  public registerNewUser(userData: any) {
    return this.httpClient.post(this.PATH_START+"/signIn", userData);
  }
}
