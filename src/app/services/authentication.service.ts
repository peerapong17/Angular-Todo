import { LoginComponent } from './../authentication/login/login.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  googleSignin() {
    window.open('http://localhost:4000/auth/google', '_self');
  }

  login(user: UserLogin): Observable<string> {
    return this.http
      .post<string>('http://localhost:4000/auth/login', user, {
        withCredentials: true,
      })
      .pipe(pluck('message'));
  }

  register(user: UserRegister): Observable<string> {
    return this.http
      .post<string>('http://localhost:4000/auth/register', user, {
        withCredentials: true,
      })
      .pipe(pluck('message'));
  }

  logout(): Observable<string> {
    return this.http
      .get<string>('http://localhost:4000/auth/logout', {
        withCredentials: true,
      })
      .pipe(pluck('message'));
  }
}
