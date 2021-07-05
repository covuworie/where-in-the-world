import { Component } from '@angular/core';
import { faBars, faHeart, faMoon } from '@fortawesome/free-solid-svg-icons';
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

  constructor(private wishListService: WishListService) {}

  get wishListCount() {
    return this.wishListService.countries.length;
  }
}
