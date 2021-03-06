import { Component } from '@angular/core';
import {
  faBars,
  faHeart,
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { VisitedStoreService } from 'src/app/visited/store/visited-store.service';
import { WishListStoreService } from 'src/app/wish-list/store/wish-list-store.service';
import { ThemeService } from '../../services/theme/theme.service';

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
    public wishListStoreService: WishListStoreService,
    public visitedStoreService: VisitedStoreService,
    public themeService: ThemeService
  ) {}
}
