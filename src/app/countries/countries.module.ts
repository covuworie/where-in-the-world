import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesComponent } from './countries.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import {
  Alpha3ToCountryFlagPipe,
  Alpha3ToCountryNamePipe,
} from './country-detail/pipes/alpha-3-to-country.pipe';
import { LanguagesToNamePipe } from './country-detail/pipes/languages-to-names.pipe';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CurrenciesToNameSymbolPipe } from './country-detail/pipes/currency-to-name-symbol.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    CountriesComponent,
    CountryDetailComponent,
    Alpha3ToCountryFlagPipe,
    Alpha3ToCountryNamePipe,
    CurrenciesToNameSymbolPipe,
    LanguagesToNamePipe,
  ],
  imports: [CommonModule, RouterModule, SharedModule, FontAwesomeModule],
  exports: [CountriesComponent],
})
export class CountriesModule {}
