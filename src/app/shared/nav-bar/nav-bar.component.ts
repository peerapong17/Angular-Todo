import { TodoService } from 'src/app/services/todo.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private authentication:AuthenticationService, public todoService:TodoService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authentication.logout()
  }

}
