import { Routes } from '@angular/router';
import { plantsByRoomResolver, PlantsService } from '@plants-app/plants';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../calendar/calendar.page').then((m) => m.CalendarPage),
    providers: [ PlantsService ],
    resolve: {
      plants: plantsByRoomResolver,
    },
  },
];
