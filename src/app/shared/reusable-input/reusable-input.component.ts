import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reusable-input',
  templateUrl: './reusable-input.component.html',
  styleUrls: ['./reusable-input.component.css'],
})
export class ReusableInputComponent implements OnInit {
  @Input() control: FormControl = new FormControl('');
  @Input() label: string = '';
  @Input() isEmpty: boolean = false;
  @Input() type: string = 'text';
  @Input() minLength: number = 0;
  constructor() {}

  ngOnInit(): void {}

  showError() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }

  get errors() {
    return this.control.errors;
  }
}
