import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs/operators';
import { CountriesService } from '../countries.service';
import ICountry, { Country } from '../country/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryDetailResolverService implements Resolve<ICountry> {
  constructor(private countriesService: CountriesService) {}

  resolve(route: ActivatedRouteSnapshot, _: RouterStateSnapshot) {
    const countryName = route.paramMap.get('name')!;
    return this.countriesService.countryDetails(countryName).pipe(
      map((restCountries) => restCountries[0]),
      map(
        (restCountry) =>
          new Country(
            restCountry.name,
            restCountry.population,
            restCountry.region,
            restCountry.capital,
            restCountry.flag,
            restCountry.alpha3Code,
            restCountry.nativeName,
            restCountry.subregion,
            restCountry.topLevelDomain,
            restCountry.callingCodes,
            restCountry.timezones,
            restCountry.borders,
            restCountry.currencies,
            restCountry.languages
          )
      )
    );
  }
}
