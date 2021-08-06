import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TITLE } from '../services/seo/seo.service';
import { WishListComponent } from './wish-list.component';

const routes: Routes = [
  {
    path: '',
    component: WishListComponent,
    data: {
      title: `${TITLE} | Wish List`,
      description: 'A List of Countries You Would Like to Visit',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WishListRoutingModule {}
