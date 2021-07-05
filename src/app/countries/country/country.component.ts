import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import ICountry from './country.model';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { WishListService } from '../wish-list/wish-list.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CountryComponent implements OnInit {
  faHeart = faHeart;

  @ViewChild(FaIconComponent, { static: true })
  heartComponent!: FaIconComponent;
  @Input() country!: ICountry;

  private onWishList = false;
  private readonly wishListHeartOn = { stroke: '#ff0000', color: '#ff0000' };
  private readonly wishListHeartOff = { stroke: 'ff0000', color: 'faa0a0' };

  constructor(private wishListService: WishListService) {}

  ngOnInit() {
    this.onWishList = this.wishListService.countryNames.includes(
      this.country.name
    );
    this.onWishList
      ? (this.heartComponent.styles = this.wishListHeartOn)
      : (this.heartComponent.styles = this.wishListHeartOff);
  }

  onToggleWishList() {
    this.onWishList = !this.onWishList;

    if (!this.onWishList) {
      this.wishListService.removeCountry(this.country.name);
      this.heartComponent.styles = this.wishListHeartOff;
    } else {
      this.wishListService.addCountry(this.country);
      this.heartComponent.styles = this.wishListHeartOn;
    }

    this.heartComponent.render();
  }
}
