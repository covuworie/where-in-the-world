import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from '../shared/local-storage.service';
import ICountry, {
  Alpha3CodeToCountry,
  Country,
  simpleFields,
} from './country/country.model';
import { Region } from './regions/region.model';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private readonly baseUrl = 'https://restcountries.eu/rest/v2';
  // 30 days time to live (TTL) as the countries data is updated on the order of months
  private readonly ttl = 1000 * 60 * 60 * 24 * 30;
  private alpha3ToCountry: Alpha3CodeToCountry = {};
  private countries: ICountry[];

  constructor(private http: HttpClient) {
    this.countries = this.countriesFromLocalStorage;
    if (this.countries.length === 0) {
      this.countries = this.getCountries(simpleFields);
    }

    this.alpha3ToCountry = this.alpha3CodeToCountryFromLocalStorage;
    if (Object.keys(this.alpha3ToCountry).length === 0) {
      this.alpha3ToCountry = this.alpha3ToCountries;
    }
  }

  getCountries(fields: string[]) {
    if (this.countries.length > 0) {
      return this.countries;
    }

    const fieldsSlug = fields.join(';');
    this.http
      .get<ICountry[]>(`${this.baseUrl}/all?fields=${fieldsSlug}`)
      .pipe(
        tap((restCountries) =>
          LocalStorageService.setItemWithExpiry(
            'countries',
            JSON.stringify(restCountries),
            this.ttl
          )
        )
      )
      .subscribe(
        (restCountries) => {
          restCountries.map((restCountry) =>
            this.countries.push(Country.fromRestCountry(restCountry, false))
          );
        },
        (error: HttpErrorResponse) => throwError(error)
      );
    return this.countries;
  }

  filterByRegion(region: Region) {
    const filteredCountries = this.countries.filter(
      (country) => country.region === region
    );
    return filteredCountries;
  }

  filterByCountry(partialName: string) {
    const filteredCountries = this.countries.filter(
      (country) =>
        country.name.toLowerCase().includes(partialName.toLowerCase()) ||
        country.nativeName.toLowerCase().includes(partialName.toLowerCase())
    );
    return filteredCountries;
  }

  alpha3CodeToCountry(alpha3Code: string) {
    return this.alpha3ToCountry[alpha3Code];
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

    return this.http
      .get<ICountry[]>(`${this.baseUrl}/name/${name}?fullText=true`)
      .pipe(
        map((restCountries) => restCountries[0]),
        tap((restCountry) =>
          LocalStorageService.setItemWithExpiry(
            name,
            JSON.stringify(restCountry),
            this.ttl
          )
        ),
        map((restCountry) => Country.fromRestCountry(restCountry))
      );
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

  private get alpha3CodeToCountryFromLocalStorage() {
    const alpha3ToCountry: Alpha3CodeToCountry | null =
      LocalStorageService.getOrRemoveExpiredItem('alpha3CodeToCountry');
    return alpha3ToCountry ? alpha3ToCountry : {};
  }

  private get alpha3ToCountries() {
    const alpha3ToCountries: Alpha3CodeToCountry = {};
    this.countries.map(
      (country) =>
        (alpha3ToCountries[country.alpha3Code] = {
          name: country.name,
          flag: country.flag,
        })
    );

    LocalStorageService.setItemWithExpiry(
      'alpha3CodeToCountry',
      JSON.stringify(this.alpha3ToCountry),
      this.ttl
    );

    return alpha3ToCountries;
  }
}
