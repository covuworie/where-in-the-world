import { Component } from '@angular/core';
import { faBars, faHeart, faMoon } from '@fortawesome/free-solid-svg-icons';
import { VisitedService } from 'src/app/countries/visited/visited.service';
import { WishListService } from 'src/app/countries/wish-list/wish-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  faMoon = faMoon;
  faBars = faBars;
  faHeart = faHeart;

  constructor(
    private wishListService: WishListService,
    private visitedService: VisitedService
  ) {}

  get wishListCount() {
    return this.wishListService.countries.length;
  }

  get visitedCount() {
    return this.visitedService.visits.length;
  }
}
