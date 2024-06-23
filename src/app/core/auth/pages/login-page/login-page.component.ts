import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { InputComponent } from '@shared/components/form/input/input.component';
import { ShowErrorComponent } from '@shared/components/form/show-error/show-error.component';
import { Role } from '@shared/enums/roles.interface';

import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, ShowErrorComponent, InputComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: [Role.OWNER, [Validators.required]],
  });

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  login() {
    const { email, password, role } = this.loginForm.value;
    this.authService.login(email, password, role).subscribe({
      next: () => {
        this.onNavigate(role);
      },
    });
  }

  onNavigate(role: string): void {
    if (role === 'owner') {
      this.router.navigateByUrl('/owner');
      return;
    }
    this.router.navigateByUrl('/admin');
    return;
  }

  protected readonly Role = Role;
}
