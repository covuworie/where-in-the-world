import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'theme-light' | 'theme-dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme = new BehaviorSubject(
    localStorage.getItem('theme') || 'theme-light'
  );

  constructor() {}

  changeTheme(theme: Theme) {
    this.currentTheme.next(theme);
    localStorage.setItem('theme', theme);
  }
}
