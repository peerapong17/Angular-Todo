import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { TodoComponent } from './todo/todo.component';
import { ToastModule } from 'primeng/toast';
import { SharedModule } from '../shared/shared.module';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';

@NgModule({
  declarations: [TodoComponent, FormComponent, ListComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MainRoutingModule,
    FormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    ToastModule,
    ButtonModule,
    RippleModule
  ],
})
export class MainModule {}
