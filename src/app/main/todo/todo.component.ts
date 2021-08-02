
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  date = new FormControl(new Date())
  constructor(public todoService: TodoService) {
    this.todoService.getTodo();
  }

  ngOnInit(): void {}

  onDateChange(date: Date){
    this.todoService.dateChange(date)
  }
}
