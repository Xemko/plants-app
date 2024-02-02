import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Plant, PlantResponse, PlantsResponse } from '../models/plant.interface';
import { normalizePlant, normalizePlants } from './plants.util';

@Injectable()
export class PlantsService {
  private http = inject(HttpClient);
  private router = inject(Router);

  getPlants(): Observable<PlantsResponse> {
    return this.http.get<PlantsResponse>('/api/plants').pipe(
      map((response) => ({
        ...response,
        plants: normalizePlants(response.plants),
      })
    ));
  }

  getPlantById(plantId: Plant['id']): Observable<PlantResponse> {
    return this.http.get<PlantResponse>(`/api/plant/${plantId}`).pipe(
      map((response) => ({
        ...response,
        plant: normalizePlant(response.plant),
      })
    ));
  }

  navigateToPlantDetails(plant: Plant): void {
    this.router.navigate([ 'plants', plant.id, 'details' ]);
  }
  
}
