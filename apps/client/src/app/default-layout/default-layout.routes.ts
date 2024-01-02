import { Routes } from '@angular/router';
import { authGuard } from '@plants-app/auth';
import { DefaultLayoutComponent } from './default-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.routes').then((m) => m.routes),
        canActivateChild: [ authGuard ],

      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('../calendar/calendar.routes').then((m) => m.routes),
        canActivateChild: [ authGuard ],
      },
      {
        path: '',
        redirectTo: '/calendar',
        pathMatch: 'full',
      },
    ],
  },

];
