import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitedComponent } from './visited.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [VisitedComponent],
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
})
export class VisitedModule {}
