import { Component, OnDestroy, OnInit } from '@angular/core';
import ICountry, { simpleFields } from '../models/country.model';
import { Region, SORTED_REGIONS } from '../models/region.model';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CountriesStoreService } from './store/countries-store.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit, OnDestroy {
  faSearch = faSearch;

  readonly filterHeader = 'All Regions';
  selectedRegion = this.filterHeader;
  regions = [this.selectedRegion];
  countries: ICountry[] = [];
  private regionsOpen = false;
  private allCountries: ICountry[] = [];
  private subscription = new Subscription();

  constructor(
    private countriesStoreService: CountriesStoreService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.subscription.add(
      this.countriesStoreService.countries.subscribe(
        (_) => {
          this.allCountries =
            this.countriesStoreService.getCountries(simpleFields);
          this.countries = this.allCountries;
          setTimeout(() => {
            this.spinner.hide();
          }, 500); // remove timeout in production
        },
        (error) => {
          setTimeout(() => {
            this.spinner.hide();
          }, 500); // remove timeout in production
          console.log(error);
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onChangeRegion(value: string) {
    this.regions.forEach((region) => this.toggleRegion(region));
    this.selectedRegion = value;

    if (value === this.filterHeader) {
      this.countries = this.allCountries;
      this.toggleDropdown();
      return;
    }
    const filteredCountries = this.countriesStoreService.filterByRegion(
      value as Region
    );
    this.countries = filteredCountries;
    this.toggleDropdown();
  }

  toggleDropdown() {
    this.regionsOpen = !this.regionsOpen;

    if (this.regionsOpen) {
      this.regions = [this.filterHeader].concat(SORTED_REGIONS);
    } else {
      this.regions = [this.selectedRegion];
    }
  }

  toggleRegion(region: string) {
    return region !== this.selectedRegion;
  }

  onSearchCountry(value: string) {
    this.countries = this.countriesStoreService.filterByCountry(value);
  }
}
