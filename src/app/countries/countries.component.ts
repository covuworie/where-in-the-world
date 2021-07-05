import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CountriesService } from './countries.service';
import ICountry from './country/country.model';
import { Region, SORTED_REGIONS } from './regions/region.model';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CountriesComponent implements OnInit {
  faSearch = faSearch;

  readonly filterHeader = 'All Regions';
  selectedRegion = this.filterHeader;
  regions = [this.selectedRegion];
  countries: ICountry[] = [];
  private regionsOpen = false;
  private allCountries: ICountry[] = [];

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    try {
      this.allCountries = this.countriesService.getCountries([
        'name',
        'population',
        'region',
        'capital',
        'flag',
        'alpha3Code',
        'nativeName',
      ]);
    } catch (error: any) {
      console.error(error);
    }
    this.countries = this.allCountries;
  }

  onChangeRegion(value: string) {
    this.regions.forEach((region) => this.toggleRegion(region));
    this.selectedRegion = value;

    if (value === this.filterHeader) {
      this.countries = this.allCountries;
      this.toggleDropdown();
      return;
    }
    const filteredCountries = this.countriesService.filterByRegion(
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
    this.countries = this.countriesService.filterByCountry(value);
  }
}
