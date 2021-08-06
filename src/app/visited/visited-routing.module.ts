import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TITLE } from '../services/seo/seo.service';
import { VisitedComponent } from './visited.component';

const routes: Routes = [
  {
    path: '',
    component: VisitedComponent,
    data: {
      title: `${TITLE} | Countries Visited`,
      description: 'A List of Countries You Have Visited',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitedRoutingModule {}
