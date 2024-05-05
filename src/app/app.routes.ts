import { Routes } from '@angular/router';
import {ResidentialUnitComponent} from "./pages/residential-unit/residential-unit.component";
import {ResidentialAdmonsComponent} from "./pages/residential-admons/residential-admons.component";

export const routes: Routes = [
  {
    path: 'residential-units',
    component: ResidentialUnitComponent
  },
  {
    path: 'residential-admons',
    component: ResidentialAdmonsComponent
  },
  {
    path: '**',
    redirectTo: 'residential-units'
  }
];
