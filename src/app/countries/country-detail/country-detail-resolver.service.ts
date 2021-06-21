import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { CountriesService } from '../countries.service';
import ICountry from '../country/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryDetailResolverService implements Resolve<ICountry> {
  constructor(private countriesService: CountriesService) {}

  resolve(route: ActivatedRouteSnapshot, _: RouterStateSnapshot) {
    const countryName = route.paramMap.get('name')!;
    return this.countriesService.countryDetails(countryName);
  }
}
