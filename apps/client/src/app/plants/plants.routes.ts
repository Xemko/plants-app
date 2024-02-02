import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'calendar',
        loadChildren: () =>
            import('./plants-calendar/plants-calendar.routes').then((m) => m.routes),
    },
    {
        path: ':plantId/details',
        loadChildren: () =>
            import('./plant-details/plant-details.routes').then((m) => m.routes),
    },
    {
        path: '',
        redirectTo: '/plants/calendar',
        pathMatch: 'full',
    },
  ];
