import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const { url } = state;

  return authService.hasAccess().pipe(
    map((hasAccess: boolean) => {
      if (hasAccess) {
        if (url === '/sign-in') {
          return router.createUrlTree([ '/' ]);
        }
      } else {
        if (url !== '/sign-in') {
          return router.createUrlTree([ '/sign-in' ]);
        }
      }
      return true;
    }),
  );
}
