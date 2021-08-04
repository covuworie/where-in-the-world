import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountriesComponent } from './countries/countries.component';
import { CountryComponent } from './shared/country/country.component';
import { HeaderComponent } from './shared/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CountryDetailComponent } from './countries/country-detail/country-detail.component';
import {
  Alpha3ToCountryNamePipe,
  Alpha3ToCountryFlagPipe,
} from './shared/country/alpha-3-to-country.pipe';
import { LanguagesToNamePipe } from './shared/country/languages-to-names.pipe';
import { CurrenciesToNameSymbolPipe } from './shared/country/currency-to-name-symbol.pipe';
import { VisitedComponent } from './visited/visited.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { CountryGridComponent } from './shared/country-grid/country-grid.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HyphenateUriPipe } from './shared/hyphenate-uri.pipe';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

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
    VisitedComponent,
    WishListComponent,
    CountryGridComponent,
    HyphenateUriPipe,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
