import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import IVisited from './visited.model';

type HttpVerb = 'post' | 'put';

@Injectable({
  providedIn: 'root',
})
export class VisitedService {
  visitsChanged = new Subject<IVisited[]>();

  visits: IVisited[] = [];

  private readonly jsonServerUrl = 'http://localhost:3000/visited';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {
    this.http.get<IVisited[]>(`${this.jsonServerUrl}`).subscribe(
      (visits) => {
        this.visits = visits;
        this.visitsChanged.next(this.visits);
      },
      (error: HttpErrorResponse) => throwError(error)
    );
  }

  addVisit(visit: IVisited) {
    this.request(visit, 'post', this.jsonServerUrl);
  }

  removeVisit(id: number) {
    if (id > 0) {
      this.http.delete(`${this.jsonServerUrl}/${id}`).subscribe();
    }

    this.visits = this.visits.filter((visit) => visit.id !== id);
    this.visitsChanged.next(this.visits);
  }

  updateVisit(visit: IVisited) {
    this.request(visit, 'put', `${this.jsonServerUrl}/${visit.id}`);
  }

  private request(visit: IVisited, verb: HttpVerb, url: string) {
    this.visits.push(visit);
    this.http[verb]<IVisited>(
      url,
      { ...visit },
      { headers: this.headers }
    ).subscribe();
    this.visitsChanged.next(this.visits);
  }
}
