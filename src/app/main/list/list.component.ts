import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/services/todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input() task: String = '';
  @Input() isCompleted: Boolean = false;
  @Input() id: String = '';
  @Input() index: number = 0;
  isEditing: Boolean = false;
  data:Todo = {
    task: '',
    isCompleted: false
  }
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  onEdit() {
    this.isEditing = !this.isEditing
  }

  onUpdate() {
    this.data = {
      task: this.task,
      isCompleted: this.isCompleted
    }
    this.isEditing = !this.isEditing
    this.todoService.updateTodo(this.id, this.index, this.data)
  }

  onDelete() {
    this.todoService.deleteTodo(this.id, this.index)
  }

  onCancel() {}
}
