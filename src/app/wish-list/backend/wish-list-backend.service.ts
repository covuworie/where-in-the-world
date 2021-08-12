import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import ICountry from 'src/app/models/country.model';
import { IWish } from 'src/app/models/wish.model';

@Injectable({
  providedIn: 'root',
})
export class WishListBackendService {
  private readonly jsonServerUrl = 'http://localhost:3000/wishList';

  constructor(private http: HttpClient) {}

  get wishList() {
    return this.http.get<IWish[]>(`${this.jsonServerUrl}`);
  }

  addCountry(country: ICountry) {
    return this.http
      .post<IWish[]>(
        this.jsonServerUrl,
        { name: country.name, id: country.numericCode },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        }
      )
      .pipe(shareReplay(1));
  }

  removeCountry(id: number) {
    return this.http.delete(`${this.jsonServerUrl}/${id}`).pipe(shareReplay(1));
  }
}
