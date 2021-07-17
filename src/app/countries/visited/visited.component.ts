import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forbiddenCountryValidator } from 'src/app/shared/forbidden-country.directive';
import { forbiddenMaxDurationValidator } from 'src/app/shared/max-duration.directive';
import { YearsService } from 'src/app/shared/years.service';
import { CountriesService } from '../countries.service';

@Component({
  selector: 'app-visited',
  templateUrl: './visited.component.html',
  styleUrls: ['./visited.component.scss'],
})
export class VisitedComponent {
  visits = this.fb.array([]);
  countriesAutoComplete: string[][] = [];

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {}

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
    const group = this.fb.group(
      {
        year: [
          '',
          [
            Validators.required,
            Validators.min(this.currentYear - 125),
            Validators.max(this.currentYear),
          ],
        ],
        country: [
          '',
          [
            Validators.required,
            forbiddenCountryValidator(this.countriesService.countryNames),
          ],
        ],
        duration: ['', [Validators.required, Validators.min(1)]],
      },
      { validators: [forbiddenMaxDurationValidator] }
    );

    this.visits.push(group);
  }

  onDeleteVisit(index: number) {
    this.visits.removeAt(index);
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
}
