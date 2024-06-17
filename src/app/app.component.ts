import {Component, computed, effect, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {
  ResidentialUnitComponent
} from './features/residentialUnitAdministrator/residential-unit/residential-unit.component';
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {NgxSpinnerComponent} from "ngx-spinner";
import {AuthService} from "./features/auth/services/auth.service";
import {AuthStatus} from "./features/auth/interfaces";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ResidentialUnitComponent, NavbarComponent, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  public finishAuthCheck = computed<boolean>(() => {
    if (this.authService.authStatus() === AuthStatus.checking) {
      return false;
    }

    return true;
  });

  public authStatusChangeEffect = effect(() => {
    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/admin');
        return;
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('auth/login');
        return;
    }
  });
}
