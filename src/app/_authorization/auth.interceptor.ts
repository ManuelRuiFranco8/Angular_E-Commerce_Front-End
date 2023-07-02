import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { UserAuthenticationService } from "../_services/user-authentication.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private userAuth: UserAuthenticationService,
    private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.headers.get("No-Auth")==="True") { //handling requests not subjected to authentication
      return next.handle(req.clone());
    }
    const token=this.userAuth.getToken();
    req=this.addToken(req, token);
    console.log(req.body);
    return next.handle(req).pipe( //handling requests subjected to token-based authentication
      catchError(
        (err:HttpErrorResponse):Observable<HttpEvent<any>> => {
          console.log(err.status);
          if(err.status===401) {
            this.router.navigate(['/login']); //redirects to login page
          } else if(err.status===403) {
            this.router.navigate(['/forbidden']); //redirects to forbidden page
          }
          return throwError("Server is not working properly") as Observable<HttpEvent<any>>;
        }
      )
    );
  }

  private addToken(request:HttpRequest<any>, token:string) {
    return request.clone(
      {setHeaders: {
        Authorization: `Bearer ${token}` //adds the token to the request to be handled
      } }
    );
  }
}
