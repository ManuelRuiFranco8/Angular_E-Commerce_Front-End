import { Component } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  errorMex: string="";

  constructor(private service: UserService,
              private router: Router) {}

  register(registerForm: NgForm) {
    console.log(registerForm.value);
    this.service.registerNewUser(registerForm.value).subscribe(
      (response: any)=>{
        console.log(response);
        alert("Congratulations! You are successfully register to the database");
        this.router.navigate(['/login']);},
      (error: any)=>{
        console.log(error);
        this.errorMex=error;
        alert(this.errorMex);}
    );
  }

  clearForm(registerForm: NgForm) { //clears the current form
    registerForm.reset();
  }
}
