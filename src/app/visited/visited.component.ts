import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { forbiddenCountryValidator } from 'src/app/shared/forbidden-country.directive';
import { forbiddenMaxDurationValidator } from 'src/app/shared/max-duration.directive';
import { CountriesService } from '../services/countries/countries.service';
import IVisited, { Visited } from '../models/visited.model';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { VisitedService } from '../services/visited/visited.service';
import { YearsService } from '../services/years/years.service';

@Component({
  selector: 'app-visited',
  templateUrl: './visited.component.html',
  styleUrls: ['./visited.component.scss'],
})
export class VisitedComponent implements OnInit, OnDestroy {
  faPlus = faPlus;

  visits = this.fb.array([]);
  countriesAutoComplete: string[][] = [];

  private subscriptions = new Subscription();
  private ids: number[] = [];

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService,
    private visitedService: VisitedService
  ) {}

  ngOnInit(): void {
    this.visitedService.visits.forEach((visit) => {
      this.setFormControls({
        id: visit.id.toString(),
        year: visit.year.toString(),
        country: visit.country.toString(),
        duration: visit.duration.toString(),
      });
      this.ids.push(visit.id);
    });
    this.subscriptions.add(
      this.visitedService.visitsChanged.subscribe((visits) => {
        // not page reload
        if (this.visits.length > 0) {
          return;
        }

        // page reload
        visits.forEach((visit) => {
          this.setFormControls({
            id: visit.id.toString(),
            year: visit.year.toString(),
            country: visit.country.toString(),
            duration: visit.duration.toString(),
          });
          this.ids.push(visit.id);
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get currentYear() {
    return YearsService.currentYear;
  }

  get minYear() {
    return YearsService.minYear;
  }

  getMaxDuration(year: number) {
    return YearsService.maxDays(year);
  }

  get visitGroups() {
    return this.visits.controls as FormGroup[];
  }

  onAddVisit() {
    this.setFormControls({ id: '', year: '', country: '', duration: '' });
    this.ids.push(-1); // signifies invalid
  }

  onDeleteVisit(index: number) {
    this.visits.removeAt(index);

    const id = this.ids[index];

    this.ids.splice(index, 1);
    this.visitedService.removeVisit(id);
  }

  onSearchCountry(partialName: string, index: number) {
    this.countriesAutoComplete[index] =
      this.countriesService.filterByName(partialName);
    if (
      this.countriesAutoComplete[index].length === 1 &&
      partialName === this.countriesAutoComplete[index][0]
    ) {
      this.countriesAutoComplete[index] = [];
    }
  }

  onSelectCountry(name: string, index: number) {
    this.visits.controls[index].get('country')!.setValue(name);
    this.countriesAutoComplete[index] = [];
    this.onFormChanged(index);
  }

  onFormChanged(index: number) {
    const visitControl = this.visits.at(index);
    if (visitControl.invalid) {
      return;
    }

    // adding
    if (this.ids[index] === -1) {
      const id = Math.max(1, Math.max(...this.ids) + 1);
      this.ids[index] = id;
      const visit: IVisited = { ...visitControl.value, id };
      this.visitedService.addVisit(Visited.fromObject(visit));
      return;
    }

    // editing
    const id = this.ids[index];
    const visit: IVisited = { ...visitControl.value, id };
    this.visitedService.updateVisit(Visited.fromObject(visit));
  }

  toggleYearDurationValidity(visit: FormGroup) {
    if (visit.errors === null) {
      if (visit.get('year')!.hasError('forbiddenMaxDuration')) {
        visit.get('year')!.setErrors(null);
      }

      if (visit.get('duration')!.hasError('forbiddenMaxDuration')) {
        visit.get('duration')!.setErrors(null);
      }

      return;
    }

    const errors = visit.errors as {};
    if (!errors.hasOwnProperty('forbiddenMaxDuration')) {
      return;
    }

    visit.get('year')!.setErrors(errors);
    visit.get('duration')!.setErrors(errors);
  }

  isTouchedAndInvalid(controlName: string, visit: FormGroup) {
    return visit.get(controlName)!.touched && !visit.get(controlName)!.valid;
  }

  isTouchedAndYearInvalid(controlName: string, visit: FormGroup) {
    if (!visit.get(controlName)!.touched) {
      return false;
    }

    const year = +visit.get(controlName)!.value; // = 0 when control.value is empty
    if (year < this.minYear || year > this.currentYear) {
      return true;
    }

    return false;
  }

  private setFormControls(visit: {
    id: string;
    year: string;
    country: string;
    duration: string;
  }) {
    const group = this.fb.group(
      {
        id: [visit.id], // not in template => only for backend
        year: [
          visit.year,
          [
            Validators.required,
            Validators.min(this.currentYear - 125),
            Validators.max(this.currentYear),
          ],
        ],
        country: [
          visit.country,
          [
            Validators.required,
            forbiddenCountryValidator(this.countriesService.countryNames),
          ],
        ],
        duration: [visit.duration, [Validators.required, Validators.min(1)]],
      },
      { validators: [forbiddenMaxDurationValidator] }
    );

    this.visits.push(group);
  }
}
