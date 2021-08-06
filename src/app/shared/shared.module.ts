import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryComponent } from './country/country.component';
import { CountryGridComponent } from './country-grid/country-grid.component';
import { HeaderComponent } from './header/header.component';
import { HyphenateUriPipe } from './pipes/hyphenate-uri.pipe';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    CountryComponent,
    CountryGridComponent,
    HeaderComponent,
    HyphenateUriPipe,
  ],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  exports: [CountryGridComponent, HeaderComponent, HyphenateUriPipe],
})
export class SharedModule {}
