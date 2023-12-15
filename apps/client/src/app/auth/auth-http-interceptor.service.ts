import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { exhaustMap, from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

export const authHttpInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  if (!req.url.startsWith('/api/')) {
    return next(req);
  }

  const authService = inject(AuthService);

  return from(authService.getAuthToken()).pipe(
    exhaustMap(authToken => {
      let authReq: HttpRequest<unknown> = req;

      if (authToken) {
        authReq = req.clone({ setHeaders: { Authorization: authToken } });
      }

      return next(authReq).pipe(
        tap(async (event: HttpEvent<unknown>) => {
          if (hasAuthTokenInHttpResponse(event)) {
            await authService.setAuthToken(event.body?.authToken as string);
          }
        })
      );
    }),
  );
};

const hasAuthTokenInHttpResponse = (event: any): event is HttpResponse<{ authToken: string; }> =>
  event instanceof HttpResponse && 'authToken' in event.body && !!event.body.authToken;