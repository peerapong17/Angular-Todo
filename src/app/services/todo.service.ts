import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Todo {
  _id?: String;
  task: String;
  isCompleted: Boolean;
  userId?: String;
  createdAt?: String;
}

export interface UserResponse {
  _id: String;
  username: String;
  createdAt: String;
}

export interface response {
  user: UserResponse;
  todos: Todo[];
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoList: response = {
    todos: [],
    user: <UserResponse>{},
  };
  constructor(private http: HttpClient) {}

  getTodo() {
    this.http
      .get<response>('http://localhost:4000/todo', {
        withCredentials: true,
      })
      .subscribe((data) => {
        console.log(data)
        this.todoList = data;
      });
  }

  createTodo(data: Todo) {
    this.http
      .post('http://localhost:4000/todo/create', data)
      .subscribe((data) => {
        console.log(data);
      });
    this.todoList.todos.push(data);
  }

  updateTodo(id: String, index: number, task: Todo) {
    this.http
      .put(`http://localhost:4000/todo/update/${id}`, task)
      .subscribe((data) => {
        console.log(data);
      });
    this.todoList.todos = this.todoList.todos.map((todo, i) =>
      index === i
        ? { ...todo, task: task.task, isCompleted: task.isCompleted }
        : todo
    );
  }

  deleteTodo(id: String, index: number) {
    this.http
      .delete(`http://localhost:4000/todo/delete/${id}`)
      .subscribe((data) => {
        console.log(data);
      });
    this.todoList.todos.splice(index, 1);
  }
}
