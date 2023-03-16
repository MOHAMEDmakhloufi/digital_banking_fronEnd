import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginFormGroup: FormGroup;
  message:string;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }
  ngOnInit(): void {
    this.loginFormGroup=this.fb.group({
      username: this.fb.control(null,[Validators.required, Validators.minLength(4)]),
      password: this.fb.control(null, [Validators.required, Validators.minLength(4)])
    })
  }
  handleLogin(){
    let username= this.loginFormGroup.value.username;
    let password= this.loginFormGroup.value.password;
    this.authService.login(username, password).subscribe({
      next : value => {
        this.authService.isAuthenticated = true;
        this.authService.saveAuthenticatedUser(value);
        this.router.navigate(["/customers"]);
      },
      error : err => this.message= err.message
    })
  }
}
