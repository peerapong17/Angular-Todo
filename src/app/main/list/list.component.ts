import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { TodoTask } from 'src/app/services/todo.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input() task: string = '';
  @Input() isCompleted: boolean = false;
  @Input() createdAt:string = '';
  @Input() id: string = '';
  @Input() index: number = 0;
  isEditing: boolean = false;
  data:TodoTask = {
    task: '',
    isCompleted: false
  }
  constructor(public todoService: TodoService) {
  }

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
    this.todoService.updateTodo(this.id, this.data)
  }

  onDelete() {
    this.todoService.deleteTodo(this.id, this.index)
  }

  onCancel() {
    this.isEditing = !this.isEditing
  }
}
