import { AuthenticationService } from '../../services/auth.service';
import { UniqueEmail } from '../Validators/unique-email';
import { MatchPassword } from './../Validators/match-password';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegister } from 'src/app/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService],
})
export class RegisterComponent implements OnInit {
  userForm = new FormGroup(
    {
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'),
        ],
        asyncValidators: [this.uniqueEmail.validate],
      }),
      username: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern('^[a-zA-Z0-9]{4,30}$'),
        ],
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      passwordConfirmation: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    },
    { validators: [this.matchPassword.validate] }
  );
  isUsernameEmpty: boolean = false;
  isEmailEmpty: boolean = false;
  isPasswordEmpty: boolean = false;
  isPasswordConfirmationEmpty: boolean = false;
  loading: boolean = false;
  constructor(
    private router: Router,
    private matchPassword: MatchPassword,
    private uniqueEmail: UniqueEmail,
    private authService: AuthenticationService,
    private messageService: MessageService
  ) {}

  get username() {
    return this.userForm.controls.username;
  }

  get email() {
    return this.userForm.controls.email;
  }

  get password() {
    return this.userForm.controls.password;
  }
  get passwordConfirmation() {
    return this.userForm.controls.passwordConfirmation;
  }

  ngOnInit(): void {}

  login() {
    this.router.navigateByUrl('/login');
  }

  register() {
    if (this.userForm.valid) {
      this.loading = true;
      const user: UserRegister = {
        email: this.email.value,
        username: this.username.value,
        password: this.password.value,
      };
      this.authService.registerUser(user).subscribe(
        (data) => {
          if (data === 'User successfully created') {
            this.messageService.add({
              severity: 'success',
              summary: 'Error',
              detail: data,
            });
            this.loading = false;
            setTimeout(() => {
              this.router.navigateByUrl('login');
            }, 3000);
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

    if (this.email.value === '') {
      this.isEmailEmpty = true;
    }

    if (this.password.value === '') {
      this.isPasswordEmpty = true;
    }

    if (this.passwordConfirmation.value === '') {
      this.isPasswordConfirmationEmpty = true;
    }
  }
}
