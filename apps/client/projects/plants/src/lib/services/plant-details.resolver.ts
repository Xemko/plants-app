import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Plant, PlantResponse } from '../models/plant.interface';
import { PlantsService } from './plants.service';

export interface PlantDetailsResolvedData {
  plant: Plant;
}

export const plantDetailsDataResolver: ResolveFn<PlantDetailsResolvedData> = (
  route: ActivatedRouteSnapshot,
): Observable<PlantDetailsResolvedData> => {
  const { plantId } = route.params;
  return inject(PlantsService).getPlantById(plantId).pipe(
    map((response: PlantResponse) => ({
      plant: response.plant,
    })),
  );
}
