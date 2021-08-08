import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/services/authentication.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  user: UserLogin = {
    username: '',
    password: '',
  };
  isUsernameEmpty: boolean = false;
  isPasswordEmpty: boolean = false;
  loading: boolean = false;
  constructor(
    private router: Router,
    public authService: AuthenticationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  get username() {
    return this.userForm.controls.username;
  }

  get password() {
    return this.userForm.controls.password;
  }

  login() {
    if (this.userForm.valid) {
      this.loading = true;
      this.user = {
        username: this.username.value,
        password: this.password.value,
      };
      this.authService.login(this.user).subscribe(
        (data) => {
          if (data === 'User seccessfully logged in') {
            this.router.navigateByUrl('todo');
            this.loading = false;
          }
        },
        (err) => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message,
          });
        }
      );
    }
    if (this.username.value === '') {
      this.isUsernameEmpty = true;
    }
    if (this.password.value === '') {
      this.isPasswordEmpty = true;
    }
  }

  register() {
    this.router.navigate(['register']);
  }
}
