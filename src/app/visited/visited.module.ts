import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitedComponent } from './visited.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VisitedRoutingModule } from './visited-routing.module';

@NgModule({
  declarations: [VisitedComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    VisitedRoutingModule,
  ],
})
export class VisitedModule {}
