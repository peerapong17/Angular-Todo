import { pluck, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

export interface TodoResponse {
  _id: string;
  task: string;
  isCompleted: boolean;
  userId: string;
  createdAt: string;
}

export interface UserResponse {
  _id: string;
  username: string;
  email: string;
}

export interface TodoTask {
  task: string;
  isCompleted: boolean;
  userId?: string;
}

export interface Response {
  user: UserResponse;
  todos: TodoResponse[];
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  pipe = new DatePipe('en-US');
  filteredListTodo: TodoResponse[] = [];
  formattedDate: string = '';
  isToday: boolean = false;
  isLoading: boolean = true;
  todoList: Response = {
    todos: [],
    user: <UserResponse>{},
  };
  constructor(private http: HttpClient) {}

  get today() {
    return this.pipe.transform(new Date(), 'shortDate')!;
  }

  set day(date: string) {
    this.formattedDate = this.pipe.transform(Date.parse(date), 'shortDate')!;
  }

  getTodo() {
    this.isToday = true;
    this.http
      .get<Response>('http://localhost:4000/todo', {
        withCredentials: true,
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')!),
        },
      })
      .subscribe((data) => {
        this.isLoading = false;
        this.todoList = data;
        this.filteredListTodo = this.todoList.todos.filter((todo) => {
          this.day = todo.createdAt!;
          return this.today === this.formattedDate;
        });
      });
  }

  dateChange(changedDate: Date) {
    this.day = changedDate.toString();
    this.isToday = this.formattedDate === this.today;
    this.filteredListTodo = this.todoList.todos.filter((todo) => {
      const createdTodoDate = this.pipe.transform(
        Date.parse(todo.createdAt!),
        'shortDate'
      );
      return createdTodoDate === this.formattedDate;
    });
  }

  createTodo(data: TodoTask) {
    this.http
      .post<TodoResponse>('http://localhost:4000/todo/create', data, {
        withCredentials: true,
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')!),
        },
      })
      .subscribe((data) => {
        this.todoList.todos.push(data);
        this.filteredListTodo.push(data);
      });
  }

  updateTodo(id: string, task: TodoTask) {
    this.http
      .put(`http://localhost:4000/todo/update/${id}`, task, {
        withCredentials: true,
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')!),
        },
      })
      .subscribe((data) => {
        console.log(data);
      });
    this.todoList.todos = this.todoList.todos.map((todo) =>
      id === todo._id
        ? { ...todo, task: task.task, isCompleted: task.isCompleted }
        : todo
    );
  }

  deleteTodo(id: string, index: number) {
    this.http
      .delete<string>(`http://localhost:4000/todo/delete/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token')!),
        },
      })
      .subscribe((data) => {
        console.log(data);
      });
    this.filteredListTodo.splice(index, 1);
    this.todoList.todos = this.todoList.todos.filter((todo) => {
      return todo._id !== id;
    });
  }
}
