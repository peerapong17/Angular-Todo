import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UniqueEmail implements AsyncValidator {
  user: { email: string } = {
    email: '',
  };
  constructor(private http: HttpClient) {}
  validate = (
    formGroup: AbstractControl
  ): Observable<ValidationErrors | null> => {
    const { value } = formGroup;
    this.user = {
      email: value,
    };
    return this.http.post('http://localhost:4000/user', this.user).pipe(
      map(() => {
        return null;
      }),
      catchError((err) => {
        return of({ noneUniqueEmail: true });
      })
    );
  };
}
