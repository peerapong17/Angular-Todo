import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TodoService } from './todo.service';

export interface User {
  username: String;
  password: String;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router, private todoService:TodoService) {}

  login(user: User) {
    this.http
      .post('http://localhost:4000/user/login', user, {
        withCredentials: true,
      })
      .subscribe((data) => {
        if (data === 'User seccessfully logged in') {
          this.router.navigateByUrl('todo');
        } else {
          alert(data);
        }
      });
  }

  register(user: User) {
    this.http
      .post('http://localhost:4000/user/register', user, {
        withCredentials: true,
      })
      .subscribe(
        (data) => {
          if(data === "User successfully registered"){
            this.router.navigateByUrl('todo')
          } else {
            alert(data)
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  logout() {
    console.log('object')
    this.http
      .get('http://localhost:4000/user/logout', {
        withCredentials: true,
      })
      .subscribe(
        (data) => {
          console.log(data);
          if (data === 'User successfully Logged out') {
            this.router.navigateByUrl('login');
            this.todoService.todoList.todos = []
          }
        },
        (err) => {
          console.log(err);
        }
      );
      
  }
}
