import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { Region } from 'src/app/models/region.model';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import ICountry, {
  Alpha3CodeToCountry,
  Country,
} from '../../models/country.model';
import { CountriesBackendService } from '../backend/countries-backend.service';

@Injectable({
  providedIn: 'root',
})
export class CountriesStoreService {
  // 30 days time to live (TTL) as the countries data is updated on the order of months
  private readonly ttl = 1000 * 60 * 60 * 24 * 30;
  private _countries = new BehaviorSubject<ICountry[]>([]);

  public readonly countries = this._countries.asObservable();

  constructor(private countriesBackendService: CountriesBackendService) {
    this.loadInitialData();
  }

  getCountries() {
    let countries = this._countries.getValue();
    if (countries.length > 0) {
      return countries;
    }

    this.countriesBackendService.getCountries().subscribe(
      (restCountries) => {
        restCountries.map((restCountry) =>
          countries.push(Country.fromRestCountry(restCountry, false))
        );
      },
      (error: HttpErrorResponse) => throwError(error)
    );
    return countries;
  }

  get countryNames() {
    const names: string[] = [];
    this._countries.getValue().forEach((country) => {
      names.push(country.name);
    });

    return names;
  }

  filterByRegion(region: Region) {
    const filteredCountries = this._countries
      .getValue()
      .filter((country) => country.region === region);
    return filteredCountries;
  }

  filterByCountry(partialName: string) {
    const filteredCountries = this._countries
      .getValue()
      .filter(
        (country) =>
          country.name.toLowerCase().includes(partialName.toLowerCase()) ||
          country.nativeName.toLowerCase().includes(partialName.toLowerCase())
      );
    return filteredCountries;
  }

  filterByName(partialName: string) {
    if (partialName.length === 0) {
      return [];
    }

    const filteredNames = this.countryNames.filter((name) =>
      name.toLowerCase().startsWith(partialName.toLowerCase())
    );
    return filteredNames;
  }

  alpha3CodeToCountry(alpha3Code: string) {
    const alpha3ToCountry: Alpha3CodeToCountry = {};
    this._countries.getValue().forEach((country) => {
      alpha3ToCountry[country.alpha3Code] = {
        name: country.name,
        flag: country.flag,
      };
    });

    return alpha3ToCountry[alpha3Code];
  }

  countryDetails(name: string) {
    let country = this.getCountryFromLocalStorage(name);
    if (country) {
      return country;
    }

    const restCountry: ICountry | null =
      LocalStorageService.getOrRemoveExpiredItem(name);
    if (restCountry) {
      const country = Country.fromRestCountry(restCountry);
      return country;
    }

    return this.countriesBackendService.getCountryDetails(name);
  }

  private get countriesFromLocalStorage() {
    const restCountries: ICountry[] | null =
      LocalStorageService.getOrRemoveExpiredItem('countries');
    if (restCountries) {
      const countries = restCountries.map((restCountry) =>
        Country.fromRestCountry(restCountry, false)
      );
      return countries;
    }
    return [];
  }

  private getCountryFromLocalStorage(name: string) {
    const restCountry: ICountry | null =
      LocalStorageService.getOrRemoveExpiredItem(name);
    if (restCountry) {
      const country = Country.fromRestCountry(restCountry);
      return country;
    }
    return null;
  }

  private loadInitialData() {
    let countries = this.countriesFromLocalStorage;
    if (countries.length === 0) {
      countries = this.getCountries();
    }
    this._countries.next(countries);
  }
}
