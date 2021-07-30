import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { Theme, ThemeService } from './header/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public themeService: ThemeService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.subscription.add(
      // Based on https://stackoverflow.com/questions/48346873/how-to-add-class-to-body-in-angular-universal
      this.themeService.currentTheme.subscribe((currentTheme) => {
        const previousTheme: Theme =
          currentTheme === 'theme-dark' ? 'theme-light' : 'theme-dark';
        this.renderer.removeClass(this.document.body, previousTheme);
        this.renderer.addClass(this.document.body, currentTheme);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
