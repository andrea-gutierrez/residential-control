import { Routes } from '@angular/router';
import {ResidentialUnitComponent} from "./features/residentialUnitAdministrator/residential-unit/residential-unit.component";
import {ResidentialAdministratorComponent} from "./features/apartmentOwner/pages/residential-manager/residential-administrator.component";

export const routes: Routes = [
  {
    path: 'residential-units',
    component: ResidentialUnitComponent
  },
  {
    path: 'residential-manager',
    component: ResidentialAdministratorComponent
  },
  {
    path: '**',
    redirectTo: 'residential-units'
  }
];
