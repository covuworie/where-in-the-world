import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CountriesStoreService } from '../countries/store/countries-store.service';
import ICountry from '../models/country.model';
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
    private countriesStoreService: CountriesStoreService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.subscriptions.add(
      this.wishListStoreService.wishList
        .pipe(map((iWish) => iWish.map((wish) => wish.name)))
        .subscribe((countryNames) => {
          const allCountries = this.countriesStoreService.getCountries();
          this.wishList = allCountries.filter((country) =>
            countryNames.includes(country.name)
          );
          setTimeout(() => {
            this.spinner.hide();
          }, 500); // remove timeout in production
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
