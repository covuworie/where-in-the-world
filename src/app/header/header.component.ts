import { Component } from '@angular/core';
import {
  faBars,
  faHeart,
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { VisitedService } from '../services/visited.service';
import { WishListService } from '../wish-list/wish-list.service';

import { ThemeService } from './theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  faBars = faBars;
  faHeart = faHeart;
  faMoon = faMoon;
  faSun = faSun;

  constructor(
    private wishListService: WishListService,
    private visitedService: VisitedService,
    public themeService: ThemeService
  ) {}

  get wishListCount() {
    return this.wishListService.countries.length;
  }

  get visitedCount() {
    return this.visitedService.visits.length;
  }
}
