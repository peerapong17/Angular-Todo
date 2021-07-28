import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin, UserRegister } from 'src/app/services/authentication.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  user:UserLogin = {
    username: '',
    password: ''
  }
  isUsernameEmpty: boolean = false;
  isPasswordEmpty: boolean = false
  constructor(private router:Router, public authService:AuthenticationService) { }

  ngOnInit(): void {
  }

  get username(){
    return this.userForm.controls.username
  }

  get password(){
    return this.userForm.controls.password
  }


  login(){
    if(this.userForm.valid){
      this.user = {
        username: this.username.value,
        password: this.password.value
      }
      this.authService.login(this.user)
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
