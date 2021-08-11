import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import ICountry from '../../models/country.model';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { WishListStoreService } from 'src/app/wish-list/store/wish-list-store.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit, OnDestroy {
  faHeart = faHeart;

  @ViewChild(FaIconComponent, { static: true })
  heartComponent!: FaIconComponent;
  @Input() country!: ICountry;

  private subscriptions = new Subscription();

  private onWishList = false;
  private readonly wishListHeartOn = {
    position: 'absolute',
    bottom: '12rem',
    right: '12rem',
    stroke: '#ff0000',
    color: '#ff0000',
  };
  private wishListHeartOff = { ...this.wishListHeartOn, color: '#faa0a0' };

  constructor(private wishListStoreService: WishListStoreService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.wishListStoreService.wishList
        .pipe(map((iWish) => iWish.map((wish) => wish.name)))
        .subscribe((countryNames) => {
          this.onWishList = countryNames.includes(this.country.name);
          this.onWishList
            ? (this.heartComponent.styles = this.wishListHeartOn)
            : (this.heartComponent.styles = this.wishListHeartOff);
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onToggleWishList() {
    this.onWishList = !this.onWishList;

    if (!this.onWishList) {
      this.wishListStoreService.removeCountry(this.country.numericCode);
      this.heartComponent.styles = this.wishListHeartOff;
    } else {
      this.wishListStoreService.addCountry(this.country);
      this.heartComponent.styles = this.wishListHeartOn;
    }

    this.heartComponent.render();
  }
}
