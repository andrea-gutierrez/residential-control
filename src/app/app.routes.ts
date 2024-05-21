import { Routes } from '@angular/router';
import {ResidentialUnitComponent} from "./pages/residential-unit/residential-unit.component";
import {ResidentialManagersComponent} from "./pages/residential-manager/residential-managers.component";

export const routes: Routes = [
  {
    path: 'residential-units',
    component: ResidentialUnitComponent
  },
  {
    path: 'residential-manager',
    component: ResidentialManagersComponent
  },
  {
    path: '**',
    redirectTo: 'residential-units'
  }
];
