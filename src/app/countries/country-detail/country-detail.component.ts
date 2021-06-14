import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Country, unknownCountry } from '../country/country.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
})
export class CountryDetailComponent implements OnInit {
  country = unknownCountry;

  constructor(
    private countriesService: CountriesService,
    public CountriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.countriesService
      .countryDetails('Colombia')
      .pipe(map((restCountries) => restCountries[0]))
      .subscribe(
        (restCountry) => {
          const country = new Country(
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
          );
          this.country = country;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          console.log(error.message);
        }
      );
  }
}