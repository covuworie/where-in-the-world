import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { CountryDetailResolverService } from './countries/country-detail/country-detail-resolver.service';
import { CountryDetailComponent } from './countries/country-detail/country-detail.component';
import { VisitedComponent } from './visited/visited.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { WishListComponent } from './wish-list/wish-list.component';

const title = 'Where in the world?';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/countries',
    pathMatch: 'full',
    data: {
      title: title,
      description:
        'An application to view details on countries, maintain a list of visited countries and to maintain a wish list of countries you would like to visit.',
    },
  },
  {
    path: 'countries',
    pathMatch: 'full',
    component: CountriesComponent,
    data: {
      title: `${title} | Countries`,
      description: 'A List of Countries',
    },
  },
  {
    path: 'countries/visited',
    pathMatch: 'full',
    component: VisitedComponent,
    data: {
      title: `${title} | Countries Visited`,
      description: 'A List of Countries You Have Visited',
    },
  },
  {
    path: 'countries/wish-list',
    pathMatch: 'full',
    component: WishListComponent,
    data: {
      title: `${title} | Wish List`,
      description: 'A List of Countries You Would Like to Visit',
    },
  },
  {
    path: 'countries/:name',
    pathMatch: 'full',
    component: CountryDetailComponent,
    resolve: { countryDetail: CountryDetailResolverService },
    data: {
      title: `${title} | {{ country }} Details`,
      description: `{{ country }} Details`,
    },
  },
  {
    path: '404',
    component: PageNotFoundComponent,
    data: {
      title: `${title} | Page Not Found`,
      description: 'Page Not Found',
    },
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
