import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/services/todo.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  todos: Todo = {
    task: '',
    isCompleted: false,
  };
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  onSubmit(value: string) {
    this.todos = {
      task: value,
      isCompleted: false,
      userId: this.todoService.todoList.user._id
    };

    this.todoService.createTodo(this.todos);
  }
}
