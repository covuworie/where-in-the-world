import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs/operators';
import IVisited from '../../models/visited.model';

type HttpVerb = 'post' | 'put';

@Injectable({
  providedIn: 'root',
})
export class VisitedBackendService {
  private readonly jsonServerUrl = 'http://localhost:3000/visited';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  get allVisits() {
    return this.http.get<IVisited[]>(`${this.jsonServerUrl}`);
  }

  addVisit(visit: IVisited) {
    return this.request(visit, 'post', this.jsonServerUrl);
  }

  removeVisit(id: number) {
    return this.http.delete(`${this.jsonServerUrl}/${id}`).pipe(shareReplay());
  }

  updateVisit(visit: IVisited) {
    return this.request(visit, 'put', `${this.jsonServerUrl}/${visit.id}`);
  }

  private request(visit: IVisited, verb: HttpVerb, url: string) {
    return this.http[verb]<IVisited>(
      url,
      { ...visit },
      { headers: this.headers }
    ).pipe(shareReplay());
  }
}
