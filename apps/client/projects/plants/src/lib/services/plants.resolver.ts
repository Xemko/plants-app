import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Plant } from '../models/plant.interface';
import { PlantsService } from './plants.service';

export const plantsResolver: ResolveFn<Plant[]> = (): Observable<Plant[]> => {
  return inject(PlantsService).getPlants().pipe(
    map((response) => response.plants),
  );
};
