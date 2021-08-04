import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function forbiddenCountryValidator(countries: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = !countries.includes(control.value);
    return forbidden ? { forbiddenCountry: control.value } : null;
  };
}
