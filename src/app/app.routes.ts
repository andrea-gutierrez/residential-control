import {Routes} from '@angular/router';
import {AuthLayoutComponent} from "./features/auth/layouts/auth-layout/auth-layout.component";
import {LoginPageComponent} from "./features/auth/pages/login-page/login-page.component";
import {AdminLayoutComponent} from "./features/admin/layouts/admin-layout/admin-layout.component";
import {isAuthenticatedGuard, isNotAuthenticatedGuard} from "./features/auth/guards";
import {ResidentialOwnerComponent} from "./features/admin/pages/residential-owner/residential-owner.component";
import {OwnerLayoutComponent} from "./features/owner/layouts/owner-layout/owner-layout.component";

import {Role} from './shared/enums/roles.interface';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [isAuthenticatedGuard],
    data: {
      roles: [Role.ADMIN]
    },
    children: [
      {
        path: 'residential-owner',
        component: ResidentialOwnerComponent
      },
      {
        path: '**',
        redirectTo: 'residential-owner'
      }
    ]
  },
  {
    path: 'owner',
    component: OwnerLayoutComponent,
    canActivate: [isAuthenticatedGuard],
    data: {
      roles: [Role.OWNER]
    }
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    canActivate: [isNotAuthenticatedGuard],
    children: [
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];
