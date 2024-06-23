import { NgForOf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '@core/auth/services/auth.service';

import { NavBar } from '../interfaces/navBar.interface';

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgForOf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  @Input({ required: true }) menuList!: NavBar;

  private authService = inject(AuthService);
  private router = inject(Router);

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/auth/login');
      },
    });
  }
}
