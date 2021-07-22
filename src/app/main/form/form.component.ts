import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { TodoTask } from 'src/app/services/todo.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  todoForm = new FormGroup({
    task: new FormControl('')
  });
  todos: TodoTask = {
    task: '',
    isCompleted: false,
  };
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  get task(){
    return this.todoForm.controls.task
  }

  onSubmit() {
    if(this.task.value != ''){
      this.todos = {
        task: this.task.value,
        isCompleted: false,
        userId: this.todoService.todoList.user._id
      };
      this.task.reset()
      this.todoService.createTodo(this.todos);
    }

    
  }
}
