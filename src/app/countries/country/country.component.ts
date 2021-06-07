import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Country, ICountry } from './country.model';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CountryComponent {
  @Input() country: ICountry = new Country('Unknown', 0, '', '', '');

  constructor() {}
}
