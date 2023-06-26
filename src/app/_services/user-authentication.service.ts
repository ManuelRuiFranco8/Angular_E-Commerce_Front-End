import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationService {

  constructor() { }

  public setRoles(roles:[]) { //saves the current user's role in a local storage
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] { //takes the current user's role from the local storage
    const rolesString=localStorage.getItem('roles');
    if(rolesString!==null) {
      return JSON.parse(rolesString);
    }
    return [];
  }

  public setToken(jwtToken: string) { //saves the current user's token in a local storage
    localStorage.setItem("jwtToken", jwtToken);
  }

  public getToken() :string { //takes the current user's token from the local storage
    const token=localStorage.getItem("jwtToken");
    if(token!==null) {
      return token;
    }
    return '';
  }

  public clear() { //deletes the content of the local storage
    localStorage.clear();
  }

  public isLoggedIn() { //returns true if the current user is logged in, false otherwise
    return this.getRoles() && this.getToken();
  }

  public isAdmin() { //returns true if the current user is an administrator
    const roles: any[]=this.getRoles();
    return roles[0].type==='ADMIN';
  }

  public isUser() { //returns true if the current user is not an administrator
    const roles: any[]=this.getRoles();
    return roles[0].type==='USER';
  }
}
