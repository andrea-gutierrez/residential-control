import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResidentialUnitComponent } from './pages/residential-unit/residential-unit.component';

@Component( {
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, ResidentialUnitComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
} )
export class AppComponent {
}
