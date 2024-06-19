import {Routes} from '@angular/router';
import {AuthLayoutComponent} from "./features/auth/layouts/auth-layout/auth-layout.component";
import {LoginPageComponent} from "./features/auth/pages/login-page/login-page.component";
import {AdminLayoutComponent} from "./features/admin/layouts/admin-layout/admin-layout.component";
import {isAuthenticatedGuard, isNotAuthenticatedGuard} from "./features/auth/guards";
import {ResidentialOwnerComponent} from "./features/admin/pages/residential-owner/residential-owner.component";
import {ResidentialOwnerLayoutComponent} from "./features/residentialOwner/layouts/residential-owner-layout/residential-owner-layout.component";

import {Role} from './shared/enums/roles.interface';
import {ResidentComponent} from "./features/residentialOwner/pages/resident/resident.component";

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
    component: ResidentialOwnerLayoutComponent,
    canActivate: [isAuthenticatedGuard],
    data: {
      roles: [Role.OWNER]
    },
    children: [
      {
        path: 'resident',
        component: ResidentComponent
      },
      {
        path: '**',
        redirectTo: 'resident'
      }
    ]
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
