import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlantsResponse } from '../models/plant.interface';
import { normalizePlants } from './plants.util';

@Injectable()
export class PlantsService {
  private http = inject(HttpClient);

  getPlants(): Observable<PlantsResponse> {
    return this.http.get<PlantsResponse>('/api/plants').pipe(
      map((response) => ({
        ...response,
        plants: normalizePlants(response.plants),
      })
    ));
  }

}
