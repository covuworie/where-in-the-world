import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import ICountry, { simpleFields } from 'src/app/models/country.model';
import { CountriesService } from '../countries/countries.service';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  countriesChanged = new Subject<ICountry[]>();

  countries: ICountry[] = [];

  private readonly jsonServerUrl = 'http://localhost:3000/wishList';

  constructor(
    private http: HttpClient,
    private countriesService: CountriesService
  ) {
    try {
      const allCountries = this.countriesService.getCountries(simpleFields);
      this.http
        .get<{ name: string; id: number }[]>(this.jsonServerUrl)
        .pipe(map((wishList) => wishList.map((wish) => wish.name)))
        .subscribe(
          (countryNames) => {
            this.countries = allCountries.filter((country) =>
              countryNames.includes(country.name)
            );
            this.countriesChanged.next(this.countries);
          },
          (error: HttpErrorResponse) => throwError(error)
        );
    } catch (error: any) {
      throwError(error);
    }
  }

  get countryNames() {
    const names = Array.from(this.countries.map((country) => country.name));
    return names;
  }

  addCountry(country: ICountry) {
    this.countries.push(country);
    this.countries = this.countries.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.http
      .post<{ name: string }>(
        this.jsonServerUrl,
        { name: country.name, id: country.numericCode },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .subscribe();
    this.countriesChanged.next(this.countries);
  }

  removeCountry(id: number) {
    this.http.delete(`${this.jsonServerUrl}/${id}`).subscribe();
    this.countries = this.countries.filter(
      (country) => country.numericCode !== id
    );
    this.countriesChanged.next(this.countries);
  }
}
