import { Component, Input } from '@angular/core';
import ICountry from '../country/country.model';

@Component({
  selector: 'app-country-grid',
  templateUrl: './country-grid.component.html',
  styleUrls: ['./country-grid.component.scss'],
})
export class CountryGridComponent {
  @Input() countries: ICountry[] = [];

  constructor() {}
}
