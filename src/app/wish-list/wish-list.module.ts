import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { WishListComponent } from './wish-list.component';
import { WishListRoutingModule } from './wish-list-routing.module';

@NgModule({
  declarations: [WishListComponent],
  imports: [CommonModule, SharedModule, WishListRoutingModule],
})
export class WishListModule {}
