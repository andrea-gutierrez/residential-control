import {Component, inject, Input} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";

import {NavBar} from "../interfaces/navBar.interface";
import {AuthService} from "../../features/auth/services/auth.service";

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgForOf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input({required: true}) menuList: NavBar[] = [];

  private authService = inject(AuthService);
  private router = inject(Router);

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/auth/login');
      }
    })
  }
}
