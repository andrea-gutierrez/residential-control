import {Component, inject} from '@angular/core';
import {RouterOutlet} from "@angular/router";

import {NavBar} from "@shared/interfaces/navBar.interface";
import {NavbarComponent} from "@shared/navbar/navbar.component";

@Component({
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

  public menuList: NavBar[] = [
    {
      name: 'Propietarios',
      url: '/admin/residential-owner'
    }
  ]
}
