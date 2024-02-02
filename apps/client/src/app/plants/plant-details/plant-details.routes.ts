import { Routes } from '@angular/router';
import { PlantsService, plantDetailsDataResolver } from '@plants-app/plants';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./plant-details.page').then((m) => m.PlantDetailsPage),
    providers: [ PlantsService ],
    resolve: {
      data: plantDetailsDataResolver
    },
  },
];
