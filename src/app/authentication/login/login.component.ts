import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/services/authentication.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User = {
    username: '',
    password: ''
  }
  constructor(private router:Router, private authentication:AuthenticationService) { }

  ngOnInit(): void {
  }

  login(){
    this.authentication.login(this.user)
  }

  register(){
    this.router.navigateByUrl('/register')
  }

}
