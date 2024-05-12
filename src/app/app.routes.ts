import { Routes } from '@angular/router';
import {ResidentialUnitComponent} from "./pages/residential-unit/residential-unit.component";
import {ResidentialAdmonsComponent} from "./pages/residential-admon/residential-admons.component";

export const routes: Routes = [
  {
    path: 'residential-units',
    component: ResidentialUnitComponent
  },
  {
    path: 'residential-admon',
    component: ResidentialAdmonsComponent
  },
  {
    path: '**',
    redirectTo: 'residential-units'
  }
];
