import { Routes } from '@angular/router';
import { authGuard } from '@plants-app/auth';
import { plantsByRoomResolver } from '../plants/services/plants-by-room.resolver';
import { PlantsService } from '../plants/services/plants.service';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivateChild: [ authGuard ],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../dashboard/dashboard.page').then((m) => m.DashboardPage),
      },
      {
        path: 'calendar',
        loadComponent: () =>
          import('../calendar/calendar.page').then((m) => m.CalendarPage),
        providers: [
          PlantsService,
        ],
        resolve: {
          plants: plantsByRoomResolver,
        },
      },
      {
        path: '',
        redirectTo: '/app/calendar',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/app/calendar',
    pathMatch: 'full',
  },
];
