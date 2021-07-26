import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TodoService } from './todo.service';
import { pluck } from 'rxjs/operators';

export interface UserRegister {
  email: string;
  username: string;
  password: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  login(user: UserLogin) {
    this.http
      .post('http://localhost:4000/user/login', user, {
        withCredentials: true,
      })
      .pipe(pluck('message'))
      .subscribe(
        (data) => {
          if (data === 'User seccessfully logged in') {
            this.router.navigateByUrl('todo');
          }
        },
        (err) => alert(err.error.message)
      );
  }

  register(user: UserRegister) {
    this.http
      .post<string>('http://localhost:4000/user/register', user, {
        withCredentials: true,
      })
      .pipe(pluck('message'))
      .subscribe(
        (data) => {
          if (data === 'User successfully created') {
            this.router.navigateByUrl('login');
          }
        },
        (err) => {
          alert(err.error.message);
        }
      );
  }

  logout() {
    this.http
      .get('http://localhost:4000/user/logout', {
        withCredentials: true,
      })
      .subscribe(
        (data) => {
          this.router.navigateByUrl('login');
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
