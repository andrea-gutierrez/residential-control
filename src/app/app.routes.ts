import { Routes } from '@angular/router';
import {ResidentialUnitComponent} from "./pages/residential-unit/residential-unit.component";

export const routes: Routes = [
  {
    path: 'residential-unit',
    component: ResidentialUnitComponent
  },
  {
    path: '**',
    redirectTo: 'residential-unit'
  }
];
