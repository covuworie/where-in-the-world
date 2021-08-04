import { Pipe, PipeTransform } from '@angular/core';
import { CountriesService } from '../../services/countries/countries.service';

@Pipe({
  name: 'alpha3ToCountryName',
})
export class Alpha3ToCountryNamePipe implements PipeTransform {
  constructor(private countriesService: CountriesService) {}

  transform(alpha3Code: string) {
    const countryName =
      this.countriesService.alpha3CodeToCountry(alpha3Code).name;
    return countryName;
  }
}

@Pipe({
  name: 'alpha3ToCountryFlag',
})
export class Alpha3ToCountryFlagPipe implements PipeTransform {
  constructor(private countriesService: CountriesService) {}

  transform(alpha3Code: string) {
    const flagUrl = this.countriesService.alpha3CodeToCountry(alpha3Code).flag;
    return flagUrl;
  }
}
