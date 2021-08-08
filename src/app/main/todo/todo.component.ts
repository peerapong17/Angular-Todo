import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [MessageService],
})
export class TodoComponent implements OnInit {
  date = new FormControl(new Date());

  constructor(
    public todoService: TodoService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private authentication: AuthenticationService,
    private router: Router
  ) {
    this.todoService.getTodo();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  onDateChange(date: Date) {
    this.todoService.dateChange(date);
  }

  onReject() {
    this.messageService.clear('c');
  }

  onConfirm() {
    this.authentication.logout().subscribe(
      (data) => {
        if (data === 'User successfully loged out') {
          this.router.navigate(['login']);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onLogout() {
    this.messageService.add({
      key: 'c',
      sticky: true,
      severity: 'warn',
      summary: 'Are you sure?',
      detail: 'Confirm to proceed',
    });
  }
}
