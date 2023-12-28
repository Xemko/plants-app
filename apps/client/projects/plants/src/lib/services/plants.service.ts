import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlantsByRoomMap, PlantsResponse } from '../models/plant.interface';
import { mapToPlantsByRoom } from './plants.util';

@Injectable()
export class PlantsService {
  private http = inject(HttpClient);

  getPlants(): Observable<PlantsResponse> {
    return this.http.get<PlantsResponse>('/api/plants');
  }

  getPlantsByRoom(): Observable<PlantsByRoomMap> {
    return this.getPlants().pipe(
      map((response: PlantsResponse) => mapToPlantsByRoom(response.plants)),
    );
  }

}
