import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutheticationRoutingModule } from './authetication-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AutheticationRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AutheticationModule { }
