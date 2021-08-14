import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  firstName: string = '';
  @Output() onLogout: EventEmitter<any> = new EventEmitter();
  constructor(
    public todoService: TodoService,
  ) {}

  ngOnInit(): void {}

  logout() {
    this.onLogout.emit()
  }
}
