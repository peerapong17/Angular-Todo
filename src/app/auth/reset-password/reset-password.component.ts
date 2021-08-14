import { ResetPasswordService } from './../../services/reset-password.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  password: string = '';
  confirmPassword: string = '';
  constructor(private passSer: ResetPasswordService) {}

  ngOnInit(): void {}

  enterPassword(form: NgForm) {
    this.passSer.resetPassword(form.value.password)
  }
}
