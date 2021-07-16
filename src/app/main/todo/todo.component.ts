
import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  date:Date = new Date()
  constructor(public todoService: TodoService) {
    this.todoService.getTodo();
  }

  ngOnInit(): void {}

  onDateChange(){
    this.todoService.dateChange(this.date)
  }
}
