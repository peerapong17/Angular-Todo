import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/services/authentication.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit, OnDestroy {
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
  loginSub: Subscription = new Subscription();
  constructor(
    private router: Router,
    public authService: AuthenticationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loginSub = this.authService.login$.subscribe((login) => {
      if (login) {
        this.router.navigate(['todo']);
      }
    });
  }

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
      this.authService.loginUser(this.user).subscribe(
        (data) => {
          if (data === 'User seccessfully logged in') {
            // this.router.navigate(['todo']);
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

  ngOnDestroy() {
    this.loginSub.unsubscribe();
  }
}
