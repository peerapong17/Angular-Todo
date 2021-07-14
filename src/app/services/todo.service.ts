import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Todo {
  _id?: String;
  task: String;
  isCompleted: Boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoList: Todo[] = [];
  constructor(private http: HttpClient) {
    http.get<Todo[]>('http://localhost:4000/todo').subscribe((data) => {
      console.log(data);
      this.todoList = data;
    });
  }

  createTodo(data: Todo) {
    this.http
      .post<Todo>('http://localhost:4000/todo/create', data)
      .subscribe((data) => {
        console.log(data);
      });
    this.todoList.push(data);
  }

  updateTodo(id: String, index: number, task: Todo) {
    this.http
      .put(`http://localhost:4000/todo/update/${id}`, task)
      .subscribe((data) => {
        console.log(data);
      });
    this.todoList = this.todoList.map((todo, i)=> index === i ? {...todo, task: task.task, isCompleted: task.isCompleted} : todo);
  }

  deleteTodo(id: String, index: number) {
    this.http.delete(`http://localhost:4000/todo/delete/${id}`).subscribe((data) => {
      console.log(data);
    });
    this.todoList.splice(index, 1)
  }
}
