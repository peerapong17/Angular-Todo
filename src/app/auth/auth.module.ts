import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AutheticationRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EnterEmailComponent } from './enter-email/enter-email.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ResetPasswordComponent, EnterEmailComponent],
  imports: [
    CommonModule,
    AutheticationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ProgressSpinnerModule,
    ToastModule
  ],
})
export class AuthModule {}
