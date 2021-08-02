import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { CountriesService } from './countries/countries.service';
import { Theme, ThemeService } from './header/theme.service';
import { SeoService } from './shared/seo.service';

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
    private seoService: SeoService,
    private countriesService: CountriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.subscription.add(
      // Based on https://stackoverflow.com/questions/48330535/dynamically-add-meta-description-based-on-route-in-angular
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          map(() => this.activatedRoute),
          map((route) => {
            while (route.firstChild) route = route.firstChild;
            return route;
          }),
          filter((route) => route.outlet === 'primary'),
          mergeMap((route) => route.data)
        )
        .subscribe((data) => {
          this.updateTitleAndDescription(data);
          this.seoService.setTitle(data['title']);
          this.seoService.setMetaTag('description', data['description']);
        })
    );

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

  private updateTitleAndDescription(data: Data) {
    const path = this.router.url;
    const country = decodeURIComponent(path.split('/countries/')[1]) || '';
    if (!this.countriesService.countryNames.includes(country)) {
      return;
    }

    const title = (data['title'] as string).replace('{{ country }}', country);
    data['title'] = title;
    const description = (data['description'] as string).replace(
      '{{ country }}',
      country
    );
    data['description'] = description;
  }
}
