import {Component, inject} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {RouterOutlet} from "@angular/router";

import {AuthService} from "../../../auth/services/auth.service";

import {NavbarComponent} from "../../../../shared/navbar/navbar.component";

@Component({
  standalone: true,
  imports: [
    JsonPipe,
    NavbarComponent,
    RouterOutlet
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  private authService = inject(AuthService);

  public menuList = [
    {
      name: 'Unidades Residenciales',
      route: 'residential-owner'
    }
  ];

  get user() {
    return this.authService.currentUser();
  }
}
