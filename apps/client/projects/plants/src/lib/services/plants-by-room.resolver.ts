import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { PlantsByRoomMap } from '../models/plant.interface';
import { PlantsService } from './plants.service';

export const plantsByRoomResolver: ResolveFn<PlantsByRoomMap> = (): Observable<PlantsByRoomMap> => {
  return inject(PlantsService).getPlantsByRoom();
};
