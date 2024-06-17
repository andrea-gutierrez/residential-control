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
    if (this.authService.authStatus() === AuthStatus.notAuthenticated) {
      this.router.navigateByUrl('auth/login');
      return;
    }
  });
}
