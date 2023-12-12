import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () => import('./sign-in/sign-in.page').then((m) => m.SignInPage),
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
