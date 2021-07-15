import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/services/authentication.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User = {
    username: '',
    password: '',
  };
  constructor(
    private router: Router,
    private authentication: AuthenticationService
  ) {}

  ngOnInit(): void {}

  login() {
    this.router.navigateByUrl('/login');
  }

  register() {
    this.authentication.register(this.user);
  }
}
