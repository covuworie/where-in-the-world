import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountriesComponent } from './countries/countries.component';
import { CountryComponent } from './countries/country/country.component';
import { HeaderComponent } from './header/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CountryDetailComponent } from './countries/country-detail/country-detail.component';
import {
  Alpha3ToCountryNamePipe,
  Alpha3ToCountryFlagPipe,
} from './countries/country/alpha-3-to-country.pipe';
import { LanguagesToNamePipe } from './countries/country/languages-to-names.pipe';
import { CurrenciesToNameSymbolPipe } from './countries/country/currency-to-name-symbol.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CountriesComponent,
    CountryComponent,
    HeaderComponent,
    CountryDetailComponent,
    Alpha3ToCountryNamePipe,
    Alpha3ToCountryFlagPipe,
    LanguagesToNamePipe,
    CurrenciesToNameSymbolPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
