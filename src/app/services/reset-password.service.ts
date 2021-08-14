import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  link: string = '';
  constructor(private http: HttpClient, private router: Router) {}

  enterEmail(value: string): Observable<string> {
    const emailConfirm: { email: string } = {
      email: value,
    };
    return this.http
      .post<{ message: string; link: string }>(
        'http://localhost:4000/reset-password',
        emailConfirm
      )
      .pipe(
        map((res) => {
          this.link = res.link;
          console.log(this.link)
          return res.message;
        })
      );
  }
  resetPassword(value: string): void {
    const passwordConfirm: { password: string } = {
      password: value,
    };
    console.log(this.link)
    this.http
      .post<{ message: string }>(this.link, passwordConfirm)
      .pipe(
        map((res) => {
          this.router.navigate(['login']);
          return res.message;
        })
      )
      .subscribe(
        (res) => console.log(res),
        (err) => {
          alert(err.message);
        }
      );
  }
}
