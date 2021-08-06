import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TITLE } from '../services/seo/seo.service';
import { PageNotFoundComponent } from './page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: PageNotFoundComponent,
    data: {
      title: `${TITLE} | Page Not Found`,
      description: 'Page Not Found',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageNotFoundRoutingModule {}
