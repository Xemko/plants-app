import { inject } from '@angular/core';
import { ResolveFn, Routes } from '@angular/router';
import { Plant, PlantsService } from '@plants-app/plants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CalendarResolvedData {
  currentDate: Date;
  events: Date[];
  plants: Plant[];
}

export const calendarDataResolver: ResolveFn<CalendarResolvedData> = (): Observable<CalendarResolvedData> => {
  return inject(PlantsService).getPlants().pipe(
    map(({ plants }) => ({
      currentDate: new Date(),
      events: plants.flatMap(plant => plant.nextWatering),
      plants,
    })),
  );
}

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../calendar/calendar.page').then((m) => m.CalendarPage),
    providers: [ PlantsService ],
    resolve: {
      data: calendarDataResolver
    },
  },
];
