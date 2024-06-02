import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResidentialUnitComponent } from './pages/residential-unit/residential-unit.component';
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {NgxSpinnerComponent} from "ngx-spinner";

@Component( {
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ResidentialUnitComponent, NavbarComponent, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
} )
export class AppComponent {
}
