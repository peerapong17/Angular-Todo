import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/services/authentication.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  user:User = {
    username: '',
    password: ''
  }
  isUsernameEmpty: boolean = false;
  isPasswordEmpty: boolean = false
  constructor(private router:Router, private authentication:AuthenticationService) { }

  ngOnInit(): void {
  }

  get username(){
    return this.userForm.controls.username
  }

  get password(){
    return this.userForm.controls.password
  }


  login(){
    if(this.username.valid && this.password.valid){
      this.user = {
        username: this.username.value,
        password: this.password.value
      }
      this.authentication.login(this.user)
    }
    if(this.username.value === ''){
      this.isUsernameEmpty = true
    }
    if(this.password.value === ''){
      this.isPasswordEmpty = true
    }
  }

  register(){
    this.router.navigateByUrl('/register')
  }

}
