import { Component } from '@angular/core';
import { faBars, faMoon } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  faMoon = faMoon;
  faBars = faBars;

  constructor() {}
}
