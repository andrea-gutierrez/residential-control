import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { AuthStatus } from '@core/auth/interfaces';
import { AuthService } from '@core/auth/services/auth.service';
import { NgxSpinnerComponent } from 'ngx-spinner';

import { menuListByRole } from '@shared/constants/menuListByRole';
import { NavBar } from '@shared/interfaces/navBar.interface';
import { NavbarComponent } from '@shared/navbar/navbar.component';

import { ResidentialUnitComponent } from './features/residentialUnitAdministrator/residential-unit/residential-unit.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ResidentialUnitComponent,
    NavbarComponent,
    NgxSpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  public menuList: NavBar = {} as NavBar;

  get isAuthenticated(): boolean {
    return this.authService.authStatus() === AuthStatus.authenticated;
  }

  public finishAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.checking) {
      return false;
    }

    return true;
  });

  private _authStatusChangeEffect = effect(() => {
    if (this.authService.authStatus() === AuthStatus.notAuthenticated) {
      this.router.navigateByUrl('auth/login');
      return;
    }

    if (this.authService.authStatus() === AuthStatus.authenticated) {
      this.menuList =
        menuListByRole.find(
          menu => menu.role === this.authService.currentUser()?.roles[0]
        ) ?? ({} as NavBar);
    }
  });
}
