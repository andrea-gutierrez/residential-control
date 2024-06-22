import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthStatus } from '../interfaces';
import { AuthService } from '../services/auth.service';

export const isNotAuthenticatedGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.authStatus() === AuthStatus.authenticated) {
    router.navigateByUrl('/admin');
    return false;
  }
  return true;
};
