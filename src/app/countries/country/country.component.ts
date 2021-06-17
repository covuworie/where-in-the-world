import { Component, Input, ViewEncapsulation } from '@angular/core';
import ICountry from './country.model';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CountryComponent {
  @Input() country: ICountry | null = null;

  constructor() {}
}
