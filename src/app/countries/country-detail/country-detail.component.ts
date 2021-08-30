import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import ICountry from '../../models/country.model';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
})
export class CountryDetailComponent implements OnInit {
  country!: ICountry;

  constructor(
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.activatedRoute.data.subscribe(
      (data) => {
        this.country = data.countryDetail;
        setTimeout(() => {
          this.spinner.hide();
        }, 500); // remove timeout in production
      },
      (error: HttpErrorResponse) => {
        setTimeout(() => {
          this.spinner.hide();
        }, 500); // remove timeout in production
        console.log(error);
        alert(error.message);
      }
    );
  }
}
