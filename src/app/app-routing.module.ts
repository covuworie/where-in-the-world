import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { CountryDetailComponent } from './countries/country-detail/country-detail.component';
import { VisitedComponent } from './countries/visited/visited.component';
import { WishListComponent } from './countries/wish-list/wish-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/countries', pathMatch: 'full' },
  { path: 'countries', component: CountriesComponent },
  { path: 'countries/visited', component: VisitedComponent },
  { path: 'countries/wish-list', component: WishListComponent },
  { path: 'countries/:name', component: CountryDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
