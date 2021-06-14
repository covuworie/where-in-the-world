import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import ICountry, {
  Alpha3CodeToCountry,
  Country,
} from './country/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private readonly baseUrl = 'https://restcountries.eu/rest/v2';
  private cachedCountries = new Subject<ICountry[]>();
  private cachedAlpha3CodeToCountry: Alpha3CodeToCountry = {};
  public countries = this.cachedCountries.asObservable();

  constructor(private http: HttpClient) {
    this.getAllCoutries([
      'name',
      'population',
      'region',
      'capital',
      'flag',
      'alpha3Code',
    ]);
  }

  alpha3CodeToCountry(alpha3Code: string) {
    return { ...this.cachedAlpha3CodeToCountry[alpha3Code] };
  }

  countryDetails(name: string) {
    return this.http.get<ICountry[]>(
      `${this.baseUrl}/name/${name}?fullText=true`
    );
  }

  private getAllCoutries(fields: string[]) {
    const fieldsSlug = fields.join(';');
    if (!this.cachedCountries.closed) {
      this.http
        .get<ICountry[]>(`${this.baseUrl}/all?fields=${fieldsSlug}`)
        .subscribe(
          (restCountries) => {
            const countries: ICountry[] = [];
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
              countries.push(country);
            }

            this.cachedCountries.next(countries);
          },
          (error: HttpErrorResponse) => throwError(error)
        );
    }
  }
}
