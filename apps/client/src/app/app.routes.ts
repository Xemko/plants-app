import { Routes } from '@angular/router';
import { authGuard } from '@plants-app/auth';

export const routes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () => import('./sign-in/sign-in.page').then((m) => m.SignInPage),
    canActivate: [ authGuard ],
  },
  {
    path: 'app',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full',
  },
];
