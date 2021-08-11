import { Pipe, PipeTransform } from '@angular/core';
import { CountriesStoreService } from '../../store/countries-store.service';

@Pipe({
  name: 'alpha3ToCountryName',
})
export class Alpha3ToCountryNamePipe implements PipeTransform {
  constructor(private countriesStoreService: CountriesStoreService) {}

  transform(alpha3Code: string) {
    const countryName =
      this.countriesStoreService.alpha3CodeToCountry(alpha3Code).name;
    return countryName;
  }
}

@Pipe({
  name: 'alpha3ToCountryFlag',
})
export class Alpha3ToCountryFlagPipe implements PipeTransform {
  constructor(private countriesStoreService: CountriesStoreService) {}

  transform(alpha3Code: string) {
    const flagUrl =
      this.countriesStoreService.alpha3CodeToCountry(alpha3Code).flag;
    return flagUrl;
  }
}
