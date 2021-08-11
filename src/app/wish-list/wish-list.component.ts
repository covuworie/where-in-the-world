import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CountriesStoreService } from '../countries/store/countries-store.service';
import ICountry, { simpleFields } from '../models/country.model';
import { WishListStoreService } from './store/wish-list-store.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent implements OnInit, OnDestroy {
  wishList: ICountry[] = [];

  private subscriptions = new Subscription();

  constructor(
    private wishListStoreService: WishListStoreService,
    private countriesStoreService: CountriesStoreService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.wishListStoreService.wishList
        .pipe(map((iWish) => iWish.map((wish) => wish.name)))
        .subscribe((countryNames) => {
          const allCountries =
            this.countriesStoreService.getCountries(simpleFields);
          this.wishList = allCountries.filter((country) =>
            countryNames.includes(country.name)
          );
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
