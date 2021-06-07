import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICountry } from './country/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  public get all() {
    return this.http.get<ICountry[]>(
      'https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag'
    );
  }
}
