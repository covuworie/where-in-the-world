import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CountriesStoreService } from 'src/app/countries/store/countries-store.service';
import ICountry from '../../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryDetailResolverService implements Resolve<ICountry> {
  constructor(
    private countriesStoreService: CountriesStoreService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, _: RouterStateSnapshot) {
    const path = route.paramMap.get('name')!;
    const name = path.replace(/-/g, ' ');
    if (!this.countriesStoreService.countryNames.includes(name)) {
      this.router.navigate(['404']);
    }

    return this.countriesStoreService.countryDetails(name);
  }
}
