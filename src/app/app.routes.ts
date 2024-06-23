import { Routes } from '@angular/router';

import {
  isAuthenticatedGuard,
  isNotAuthenticatedGuard,
} from '@core/auth/guards';
import { isAuthorizedGuard } from '@core/auth/guards/is-authorized.guard';
import { AuthLayoutComponent } from '@core/auth/layouts/auth-layout/auth-layout.component';
import { LoginPageComponent } from '@core/auth/pages/login-page/login-page.component';

import { Role } from '@shared/enums/roles.interface';

import { AdminLayoutComponent } from './features/admin/layouts/admin-layout/admin-layout.component';
import { HomeLayoutComponent } from './features/home/layouts/home-layout/home-layout.component';
import { ResidentialOwnerLayoutComponent } from './features/residentialOwner/layouts/residential-owner-layout/residential-owner-layout.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [isAuthenticatedGuard, isAuthorizedGuard],
    data: {
      roles: [Role.ADMIN],
    },
    loadChildren: () =>
      import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
  },
  {
    path: 'owner',
    component: ResidentialOwnerLayoutComponent,
    canActivate: [isAuthenticatedGuard, isAuthorizedGuard],
    data: {
      roles: [Role.OWNER],
    },
    loadChildren: () =>
      import('./features/residentialOwner/residentialOwner.route').then(
        m => m.RESIDENTIAL_OWNER_ROUTES
      ),
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [isNotAuthenticatedGuard],
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
  {
    path: 'home',
    component: HomeLayoutComponent,
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
