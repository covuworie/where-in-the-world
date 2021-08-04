import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import ICountry from '../models/country.model';
import { WishListService } from './wish-list.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent implements OnInit, OnDestroy {
  countries: ICountry[] = [];

  private subscriptions = new Subscription();

  constructor(private wishListService: WishListService) {}

  ngOnInit(): void {
    this.countries = this.wishListService.countries;
    this.subscriptions.add(
      this.wishListService.countriesChanged.subscribe(
        (countries) => (this.countries = countries)
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
