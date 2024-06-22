import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavBar } from '@shared/interfaces/navBar.interface';
import { NavbarComponent } from '@shared/navbar/navbar.component';

@Component({
  selector: 'residential-owner-layout',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './residential-owner-layout.component.html',
  styleUrl: './residential-owner-layout.component.scss',
})
export class ResidentialOwnerLayoutComponent {
  public menuList: NavBar[] = [
    {
      name: 'Residente',
      url: '/owner/resident',
    },
  ];
}
