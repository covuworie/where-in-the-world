import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'theme-light' | 'theme-dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _currentTheme = new BehaviorSubject(
    localStorage.getItem('theme') || 'theme-light'
  );

  public readonly currentTheme = this._currentTheme.asObservable();

  constructor() {}

  changeTheme(theme: Theme) {
    this._currentTheme.next(theme);
    localStorage.setItem('theme', theme);
  }
}
