import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { WishListComponent } from './wish-list.component';

@NgModule({
  declarations: [WishListComponent],
  imports: [CommonModule, SharedModule],
  exports: [WishListComponent],
})
export class WishListModule {}
