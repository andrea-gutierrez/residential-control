import {Routes} from '@angular/router';
import {AuthLayoutComponent} from "./features/auth/layouts/auth-layout/auth-layout.component";
import {LoginPageComponent} from "./features/auth/pages/login-page/login-page.component";
import {AdminLayoutComponent} from "./features/admin/layouts/admin-layout/admin-layout.component";
import {isAuthenticatedGuard, isNotAuthenticatedGuard} from "./features/auth/guards";
import {ResidentialOwnerComponent} from "./features/admin/pages/residential-owner/residential-owner.component";
import {FormComponent} from "./features/admin/components/form/form.component";

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [isAuthenticatedGuard],
    data: {
      profile: 'manager'
    },
    children: [
      {
        path: 'residential-owner',
        component: ResidentialOwnerComponent
      },
      {
        path: 'form',
        component: FormComponent
      },
      {
        path: '**',
        redirectTo: 'residential-owner'
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
