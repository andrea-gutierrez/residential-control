import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const isAuthorizedGuard: CanActivateFn = (route, _state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const roles = route.data.roles as Array<string>;

  const hasRole = roles.some(role => authService.currentUser()?.roles.includes(role.toLowerCase())) ?? false;
  console.log(hasRole);
  if (hasRole) {
    return true;
  }
  router.navigateByUrl('/home');
  return false;
};
