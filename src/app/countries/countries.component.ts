import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
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

  @ViewChild('regionDropDown')
  regionDropDown: ElementRef<HTMLDivElement> | null = null;
  filterHeader = 'All Regions';
  regions = SORTED_REGIONS;
  countries: ICountry[] = [];
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

  onDropDownRegion() {
    const inputs = this.regionOptions;
    const spans = this.dropDownSymbols;
    inputs.forEach((input, index) => {
      const parentDiv = input.parentElement as HTMLDivElement;
      parentDiv.hidden = false;
      if (index > 0) {
        spans[index].hidden = true;
      } else {
        spans[0].hidden = false;
      }
    });
  }

  onChangeRegion(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    const selectedIndex = this.regions.indexOf(value as Region) + 1;
    const inputs = this.regionOptions;
    const spans = this.dropDownSymbols;
    inputs.forEach((input, index) => {
      const parentDiv = input.parentElement as HTMLDivElement;
      parentDiv.hidden = (input as HTMLInputElement).value !== value;
      if (index === selectedIndex) {
        spans[index].hidden = false;
      }
    });

    if (value === this.filterHeader) {
      this.countries = this.allCountries;
      return;
    }
    const filteredCountries = this.countriesService.filterByRegion(
      value as Region
    );
    this.countries = filteredCountries;
  }

  onSearchCountry(value: string) {
    this.countries = this.countriesService.filterByCountry(value);
  }

  private get regionOptions() {
    const inputs = Array.from(
      this.regionDropDown!.nativeElement.getElementsByClassName('search-region')
    );
    return inputs;
  }

  private get dropDownSymbols() {
    const spans = Array.from(
      this.regionDropDown!.nativeElement.getElementsByTagName('span')
    );
    return spans;
  }
}
