import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import ICountry from 'src/app/models/country.model';
import { IWish } from 'src/app/models/wish.model';
import { WishListBackendService } from '../backend/wish-list-backend.service';

@Injectable({
  providedIn: 'root',
})
export class WishListStoreService {
  private _wishList = new BehaviorSubject<IWish[]>([]);

  public readonly wishList = this._wishList.asObservable();

  constructor(private wishListBackendService: WishListBackendService) {
    this.loadInitialData();
  }

  addCountry(country: ICountry) {
    this.wishListBackendService.addCountry(country).subscribe((_) => {
      this._wishList
        .getValue()
        .push({ name: country.name, id: country.numericCode });

      const wishList = this._wishList.getValue().sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      this._wishList.next(wishList);
    });
  }

  removeCountry(id: number) {
    this.wishListBackendService.removeCountry(id).subscribe((_) => {
      const wishList = this._wishList
        .getValue()
        .filter((wList) => wList.id !== id);
      this._wishList.next(wishList);
    });
  }

  private loadInitialData() {
    this.wishListBackendService.wishList.subscribe(
      (wishList) => {
        this._wishList.getValue().push(...wishList);
      },
      (error: HttpErrorResponse) => throwError(error)
    );
  }
}
