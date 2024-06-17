import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const path = route.url[0].path;
  const userProfile = localStorage.getItem('profile') ?? '';

  if (path.includes('manager') && route.data?.profile === 'manager' && userProfile === 'manager') {
    return true;
  } else if (path.includes('residential-units') && route.data?.profile === 'owner' && userProfile === 'owner') {
    return true
  } else {
    router.navigate(['/login']);
    return false
  }
};
