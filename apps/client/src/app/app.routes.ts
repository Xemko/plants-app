import { Routes } from '@angular/router';
import { authGuard } from '@plants-app/auth';

export const routes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () => import('./sign-in/sign-in.page').then((m) => m.SignInPage),
    canActivate: [ authGuard ],
  },
  {
    path: '',
    loadChildren: () =>
      import('./default-layout/default-layout.routes').then((m) => m.routes),
  },
];
