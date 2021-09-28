import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, shareReplay, tap } from 'rxjs/operators';
import ICountry, { Country } from 'src/app/models/country.model';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CountriesBackendService {
  private readonly baseUrl = 'https://restcountries.com/v2/';
  // 30 days time to live (TTL) as the countries data is updated on the order of months
  private readonly ttl = 1000 * 60 * 60 * 24 * 30;

  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http.get<ICountry[]>(`${this.baseUrl}/all/`).pipe(
      shareReplay(1),
      tap((restCountries) =>
        LocalStorageService.setItemWithExpiry(
          'countries',
          JSON.stringify(restCountries),
          this.ttl
        )
      )
    );
  }

  getCountryDetails(name: string) {
    return this.http
      .get<ICountry[]>(`${this.baseUrl}/name/${name}?fullText=true`)
      .pipe(
        shareReplay(1),
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
