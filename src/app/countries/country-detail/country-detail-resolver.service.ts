import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CountriesService } from '../countries.service';
import ICountry from '../../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryDetailResolverService implements Resolve<ICountry> {
  constructor(
    private countriesService: CountriesService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, _: RouterStateSnapshot) {
    const path = route.paramMap.get('name')!;
    const name = path.replace(/-/g, ' ');
    if (!this.countriesService.countryNames.includes(name)) {
      this.router.navigate(['404']);
    }

    return this.countriesService.countryDetails(name);
  }
}
