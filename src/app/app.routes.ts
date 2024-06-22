import { Routes } from '@angular/router';

import { Role } from '@shared/enums/roles.interface';

import { AdminLayoutComponent } from './features/admin/layouts/admin-layout/admin-layout.component';
import { ResidentialOwnerComponent } from './features/admin/pages/residential-owner/residential-owner.component';
import {
  isAuthenticatedGuard,
  isNotAuthenticatedGuard,
} from './features/auth/guards';
import { isAuthorizedGuard } from './features/auth/guards/is-authorized.guard';
import { AuthLayoutComponent } from './features/auth/layouts/auth-layout/auth-layout.component';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { HomeLayoutComponent } from './features/home/layouts/home-layout/home-layout.component';
import { ResidentialOwnerLayoutComponent } from './features/residentialOwner/layouts/residential-owner-layout/residential-owner-layout.component';
import { ResidentComponent } from './features/residentialOwner/pages/resident/resident.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [isAuthenticatedGuard, isAuthorizedGuard],
    data: {
      roles: [Role.ADMIN],
    },
    children: [
      {
        path: 'residential-owner',
        component: ResidentialOwnerComponent,
      },
      {
        path: '**',
        redirectTo: 'residential-owner',
      },
    ],
  },
  {
    path: 'owner',
    component: ResidentialOwnerLayoutComponent,
    canActivate: [isAuthenticatedGuard, isAuthorizedGuard],
    data: {
      roles: [Role.OWNER],
    },
    children: [
      {
        path: 'resident',
        component: ResidentComponent,
      },
      {
        path: '**',
        redirectTo: 'resident',
      },
    ],
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
