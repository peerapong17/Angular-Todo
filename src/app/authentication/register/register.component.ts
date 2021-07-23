import { MatchPassword } from './../Validators/match-password';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/services/authentication.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]),
    username: new FormControl('', [Validators.required, Validators.minLength(6) , Validators.pattern("^[a-zA-Z0-9]{4,10}$")]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(6)]),
  }, {validators: [this.matchPassword.validate]});
  user: User = {
    username: '',
    password: '',
  };
  isUsernameEmpty: boolean = false;
  isEmailEmpty: boolean = false
  isPasswordEmpty: boolean = false
  isPasswordConfirmationEmpty: boolean = false
  constructor(
    private router: Router,
    private matchPassword: MatchPassword,
    private authentication: AuthenticationService
  ) {}

  get username(){
    return this.userForm.controls.username
  }

  get email(){
    return this.userForm.controls.email
  }

  get password(){
    return this.userForm.controls.password
  }
  get passwordConfirmation(){
    return this.userForm.controls.passwordConfirmation
  }

  ngOnInit(): void {}

  login() {
    this.router.navigateByUrl('/login');
  }

  register() {
    if(this.username.valid && this.password.valid && this.userForm.valid){
      console.log(this.userForm.valid)
      // this.user = {
      //   username: this.username.value,
      //   password: this.password.value
      // }
      // this.authentication.register(this.user);
    }

    if(this.username.value === ''){
      this.isUsernameEmpty = true
    }

    if(this.email.value === ''){
      this.isEmailEmpty = true
    }

    if(this.password.value === ''){
      this.isPasswordEmpty = true
    }

    if(this.passwordConfirmation.value === ''){
      this.isPasswordConfirmationEmpty = true
    }
    
  }
}
