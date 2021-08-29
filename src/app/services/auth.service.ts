import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

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
  login$: Subject<boolean> = new Subject<boolean>();
  // login$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  googleSignin() {
    window.open('http://localhost:4000/auth/google', '_self');
  }

  loginUser(
    user: UserLogin
  ): Observable<{
    message: string;
    accessToken: string;
    authenticaated: boolean;
  }> {
    return this.http
      .post<{ message: string; accessToken: string; authenticaated: boolean }>(
        'http://localhost:4000/auth/login',
        user,
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap(() => {
          this.login$.next(true);
        })
      );
  }

  registerUser(user: UserRegister): Observable<string> {
    return this.http
      .post<string>('http://localhost:4000/auth/register', user, {
        withCredentials: true,
      })
      .pipe(pluck('message'));
  }

  logoutUser(): Observable<string> {
    return this.http
      .get<string>('http://localhost:4000/auth/logout', {
        withCredentials: true,
      })
      .pipe(pluck('message'));
  }
}
