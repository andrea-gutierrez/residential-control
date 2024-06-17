import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

interface RoutePermission {
  profile: string;
  routes: string[];
}

const permissions: RoutePermission[] = [
  {
    profile: 'manager',
    routes: [
      'residential-manager'
    ]
  }
]

@Component({
  selector: 'shared-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
