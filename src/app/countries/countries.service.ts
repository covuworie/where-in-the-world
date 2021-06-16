import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import ICountry, {
  Alpha3CodeToCountry,
  Country,
} from './country/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private readonly baseUrl = 'https://restcountries.eu/rest/v2';
  private cachedCountries: ICountry[] = [];
  private cachedAlpha3CodeToCountry: Alpha3CodeToCountry = {};

  constructor(private http: HttpClient) {
    this.setCountries([
      'name',
      'population',
      'region',
      'capital',
      'flag',
      'alpha3Code',
    ]);
  }

  get countries() {
    return this.cachedCountries;
  }

  alpha3CodeToCountry(alpha3Code: string) {
    return { ...this.cachedAlpha3CodeToCountry[alpha3Code] };
  }

  countryDetails(name: string) {
    return this.http.get<ICountry[]>(
      `${this.baseUrl}/name/${name}?fullText=true`
    );
  }

  private setCountries(fields: string[]) {
    this.cachedCountries = [];
    const fieldsSlug = fields.join(';');
    this.http
      .get<ICountry[]>(`${this.baseUrl}/all?fields=${fieldsSlug}`)
      .subscribe(
        (restCountries) => {
          for (const restCountry of restCountries) {
            this.cachedAlpha3CodeToCountry[restCountry.alpha3Code] = {
              name: restCountry.name,
              flag: restCountry.flag,
            };

            const country = new Country(
              restCountry.name,
              restCountry.population,
              restCountry.region,
              restCountry.capital,
              restCountry.flag,
              restCountry.alpha3Code
            );
            this.cachedCountries.push(country);
          }
        },
        (error: HttpErrorResponse) => throwError(error)
      );
  }
}
