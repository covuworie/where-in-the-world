import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from '../shared/local-storage.service';
import ICountry, {
  Alpha3CodeToCountry,
  Country,
} from './country/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private readonly baseUrl = 'https://restcountries.eu/rest/v2';
  // 30 days time to live (TTL) as the countries data is updated on the order of months
  private readonly ttl = 1000 * 60 * 60 * 24 * 30;
  private alpha3ToCountry: Alpha3CodeToCountry = {};

  constructor(private http: HttpClient) {}

  getCountries(fields: string[]) {
    let countries: ICountry[] = [];

    const restCountries: ICountry[] | null =
      LocalStorageService.getOrRemoveExpiredItem('countries');
    if (restCountries) {
      countries = restCountries.map((restCountry) =>
        Country.fromRestCountry(restCountry, false)
      );
      return countries;
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
          for (const restCountry of restCountries) {
            this.alpha3ToCountry[restCountry.alpha3Code] = {
              name: restCountry.name,
              flag: restCountry.flag,
            };

            const country = Country.fromRestCountry(restCountry, false);
            countries.push(country);
          }
          LocalStorageService.setItemWithExpiry(
            'alpha3CodeToCountry',
            JSON.stringify(this.alpha3ToCountry),
            this.ttl
          );
        },
        (error: HttpErrorResponse) => throwError(error)
      );
    return countries;
  }

  alpha3CodeToCountry(alpha3Code: string) {
    const alphaCodeToCountry: Alpha3CodeToCountry | null =
      LocalStorageService.getOrRemoveExpiredItem('alpha3CodeToCountry');
    if (!alphaCodeToCountry) {
      this.getCountries([
        'name',
        'population',
        'region',
        'capital',
        'flag',
        'alpha3Code',
      ]);
    }
    return { ...this.alpha3ToCountry[alpha3Code] };
  }

  countryDetails(name: string) {
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
}
