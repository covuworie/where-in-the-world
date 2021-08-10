import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import IVisited from 'src/app/models/visited.model';
import { VisitedBackendService } from '../backend/visited-backend.service';

@Injectable({
  providedIn: 'root',
})
export class VisitedStoreService {
  private _visits = new BehaviorSubject<IVisited[]>([]);

  public readonly visits = this._visits.asObservable();

  constructor(private visitedBackendService: VisitedBackendService) {
    this.loadInitialData();
  }

  addVisit(visit: IVisited) {
    this.visitedBackendService.addVisit(visit).subscribe((_) => {
      const visits = this._visits.getValue();
      visits.push(visit);
      this._visits.next(visits);
    });
  }

  removeVisit(id: number) {
    if (id > 0) {
      this.visitedBackendService.removeVisit(id).subscribe((_) => {
        const visits = this._visits
          .getValue()
          .filter((visit) => visit.id !== id);
        this._visits.next(visits);
      });
    }
  }

  updateVisit(visit: IVisited) {
    this.visitedBackendService.updateVisit(visit).subscribe((_) => {
      const visits = this._visits.getValue();
      const index = visits.findIndex((vst) => vst.id === visit.id);
      visits[index] = visit;
      this._visits.next(visits);
    });
  }

  private loadInitialData() {
    this.visitedBackendService.allVisits.subscribe(
      (visits) => {
        this._visits.getValue().push(...visits);
      },
      (error: HttpErrorResponse) => throwError(error)
    );
  }
}
