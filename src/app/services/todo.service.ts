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
  createdAt: string;
}

export interface TodoTask {
  task: string
  isCompleted: boolean
  userId?: string
}

export interface Response {
  user: UserResponse;
  todos: TodoResponse[];
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  pipe = new DatePipe('en-US')
  filteredListTodo: TodoResponse[] = []
  todoList: Response = {
    todos: [],
    user: <UserResponse>{},
  };
  constructor(private http: HttpClient) {}
  

  getTodo() {
    const formattedDate = this.pipe.transform(new Date(), "shortDate")
    this.http
      .get<Response>('http://localhost:4000/todo', {
        withCredentials: true,
      })
      .subscribe((data) => {
        this.filteredListTodo = data.todos.filter(todo=>{
          const createdTodoDate = this.pipe.transform(Date.parse(todo.createdAt!), 'shortDate')
          return formattedDate === createdTodoDate
        })
        this.todoList = data;
        this.todoList.todos = this.filteredListTodo
      });
  }

  dateChange(changedDate: Date){
    const formattedDate = this.pipe.transform(changedDate, "shortDate")
    this.http
      .get<Response>('http://localhost:4000/todo', {
        withCredentials: true,
      })
      .subscribe((data) => {
        this.todoList = data;
        this.todoList.todos = this.todoList.todos.filter(todo=>{
          const createdTodoDate = this.pipe.transform(Date.parse(todo.createdAt!), 'shortDate')
          return formattedDate === createdTodoDate
        })
      });
  }

  createTodo(data: TodoTask) {
    this.http
      .post<TodoResponse>('http://localhost:4000/todo/create', data)
      .subscribe((data) => {
        this.todoList.todos.push(data);
      });
    
  }

  updateTodo(id: string, task: TodoTask) {
    this.http
      .put(`http://localhost:4000/todo/update/${id}`, task)
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
      .delete<string>(`http://localhost:4000/todo/delete/${id}`)
      .subscribe((data) => {
        console.log(data);
      });
    this.todoList.todos.splice(index, 1);
  }
}
