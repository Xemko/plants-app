import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { exhaustMap, filter, from, Observable } from 'rxjs';
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
      console.log({authReq})
      console.log({next})
      return next(authReq).pipe(
        tap((event: HttpEvent<unknown>) => {
          console.log(99, event)
        }),
        tap(async (event: HttpEvent<unknown>) => {
          console.log(44, event)
          if (hasAuthTokenInHttpResponse(event)) {
            console.log(55, event.body)
            await authService.setAuthToken(event.body?.authToken as string);
          }
        })
      );
    }),
  );
};

const hasAuthTokenInHttpResponse = (event: any): event is HttpResponse<{ authToken: string; }> =>
  event instanceof HttpResponse && 'authToken' in event.body && !!event.body.authToken;