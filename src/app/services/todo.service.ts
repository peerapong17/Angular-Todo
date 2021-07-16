import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
export interface Todo {
  _id?: string;
  task: string;
  isCompleted: boolean;
  userId?: string;
  createdAt?: string;
}

export interface UserResponse {
  _id: string;
  username: string;
  createdAt: string;
}

export interface Response {
  user: UserResponse;
  todos: Todo[];
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  pipe = new DatePipe('en-US')
  todoList: Response = {
    todos: [],
    user: <UserResponse>{},
  };
  constructor(private http: HttpClient) {}

  getTodo() {
    this.http
      .get<Response>('http://localhost:4000/todo', {
        withCredentials: true,
      })
      .subscribe((data) => {
        console.log(data)
        this.todoList = data;
      });
  }

  dateChange(changedDate: Date){
    console.log('Change')
    const formattedDate = this.pipe.transform(changedDate, "shortDate")
    this.http
      .get<Response>('http://localhost:4000/todo', {
        withCredentials: true,
      })
      .subscribe((data) => {
        this.todoList = data;
        this.todoList.todos = this.todoList.todos.filter(todo=>{
          // console.log(formattedDate)
          // console.log(this.pipe.transform(Date.parse(todo.createdAt!), 'shortDate'))
          console.log(formattedDate === this.pipe.transform(Date.parse(todo.createdAt!), 'shortDate'))
          const createdTodoDate = this.pipe.transform(Date.parse(todo.createdAt!), 'shortDate')
          return formattedDate === createdTodoDate
        })
        console.log(this.todoList.todos)
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

  updateTodo(id: string, index: number, task: Todo) {
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

  deleteTodo(id: string, index: number) {
    this.http
      .delete(`http://localhost:4000/todo/delete/${id}`)
      .subscribe((data) => {
        console.log(data);
      });
    this.todoList.todos.splice(index, 1);
  }
}
