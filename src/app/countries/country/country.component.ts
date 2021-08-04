import { Component, Input, OnInit, ViewChild } from '@angular/core';
import ICountry from '../../models/country.model';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { WishListService } from 'src/app/wish-list/wish-list.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  faHeart = faHeart;

  @ViewChild(FaIconComponent, { static: true })
  heartComponent!: FaIconComponent;
  @Input() country!: ICountry;

  private onWishList = false;
  private readonly wishListHeartOn = {
    position: 'absolute',
    bottom: '12rem',
    right: '12rem',
    stroke: '#ff0000',
    color: '#ff0000',
  };
  private wishListHeartOff = { ...this.wishListHeartOn, color: '#faa0a0' };

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
      this.wishListService.removeCountry(this.country.numericCode);
      this.heartComponent.styles = this.wishListHeartOff;
    } else {
      this.wishListService.addCountry(this.country);
      this.heartComponent.styles = this.wishListHeartOn;
    }

    this.heartComponent.render();
  }
}
