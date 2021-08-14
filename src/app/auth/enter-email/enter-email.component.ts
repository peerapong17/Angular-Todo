import { ResetPasswordService } from './../../services/reset-password.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enter-email',
  templateUrl: './enter-email.component.html',
  styleUrls: ['./enter-email.component.css'],
})
export class EnterEmailComponent implements OnInit {
  email: string = '';
  constructor(private router: Router, private passSer: ResetPasswordService) {}

  ngOnInit(): void {}

  enterEmail(form: NgForm) {
    this.passSer.enterEmail(form.value.email).subscribe(
      (res) => {
        if (res === 'password reset link sent to your email account') {
          this.router.navigate(['reset-password']);
        }
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
