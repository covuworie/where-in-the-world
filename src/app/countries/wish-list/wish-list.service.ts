import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import ICountry from '../country/country.model';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  countriesChanged = new Subject<ICountry[]>();

  countries: ICountry[] = [];

  constructor() {}

  get countryNames() {
    const names = Array.from(this.countries.map((country) => country.name));
    return names;
  }

  addCountry(country: ICountry) {
    this.countries.push(country);
  }

  removeCountry(name: string) {
    this.countries = this.countries.filter((country) => country.name !== name);
    this.countriesChanged.next(this.countries);
  }
}
