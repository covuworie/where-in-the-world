import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryDetailResolverService } from '../services/country-detail/country-detail-resolver.service';
import { TITLE } from '../services/seo/seo.service';
import { CountriesComponent } from './countries.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CountriesComponent,
    data: {
      title: `${TITLE} | Countries`,
      description: 'A List of Countries',
    },
  },
  {
    path: ':name',
    component: CountryDetailComponent,
    resolve: { countryDetail: CountryDetailResolverService },
    data: {
      title: `${TITLE} | {{ country }} Details`,
      description: `{{ country }} Details`,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriesRoutingModule {}
