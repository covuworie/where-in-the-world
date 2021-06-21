import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CountriesService } from './countries.service';
import ICountry from './country/country.model';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CountriesComponent implements OnInit {
  countries: ICountry[] = [];

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    try {
      this.countries = this.countriesService.getCountries([
        'name',
        'population',
        'region',
        'capital',
        'flag',
        'alpha3Code',
      ]);
    } catch (error: any) {
      console.error(error);
    }
  }
}
