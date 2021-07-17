import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class YearsService {
  private constructor() {}

  static get currentYear() {
    return new Date().getFullYear();
  }

  static get minYear() {
    return YearsService.currentYear - 125;
  }

  static isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  static maxDays(year: number) {
    const isLeapYear = YearsService.isLeapYear(year);
    return isLeapYear ? 366 : 365;
  }
}
