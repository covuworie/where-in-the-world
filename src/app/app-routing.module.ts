import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TITLE } from './services/seo/seo.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/countries',
    pathMatch: 'full',
    data: {
      title: TITLE,
      description:
        'An application to view details on countries, maintain a list of visited countries and to maintain a wish list of countries you would like to visit.',
    },
  },
  {
    path: 'countries',
    loadChildren: () =>
      import('./countries/countries.module').then((m) => m.CountriesModule),
  },
  {
    path: 'visited',
    loadChildren: () =>
      import('./visited/visited.module').then((m) => m.VisitedModule),
  },
  {
    path: 'wish-list',
    loadChildren: () =>
      import('./wish-list/wish-list.module').then((m) => m.WishListModule),
  },
  {
    path: '404',
    loadChildren: () =>
      import('./page-not-found/page-not-found.module').then(
        (m) => m.PageNotFoundModule
      ),
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
