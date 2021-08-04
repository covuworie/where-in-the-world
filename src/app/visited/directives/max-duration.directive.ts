import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { YearsService } from 'src/app/services/years/years.service';

export const forbiddenMaxDurationValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const year = control.get('year')?.value as number | null;
  const duration = control.get('duration')?.value as number | null;
  if (
    duration === null ||
    year === null ||
    duration < 1 ||
    year < YearsService.minYear
  ) {
    return null;
  }

  const maxDuration = YearsService.maxDays(year);
  const forbidden = duration > maxDuration;
  return forbidden ? { forbiddenMaxDuration: control.value } : null;
};
