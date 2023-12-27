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
        authReq = req.clone({ setHeaders: { [HEADER_X_AUTH_TOKEN]: authToken } });
      }

      return next(authReq).pipe(
        tap(async (event: HttpEvent<unknown>) => {
          if (hasAuthTokenInHttpResponse(event)) {
            await authService.setAuthToken(getAuthTokenFromHttpResponse(event));
          }
        })
      );
    }),
  );
};

const HEADER_X_AUTH_TOKEN: string = 'x-auth-token';

const hasAuthTokenInHttpResponse = (event: any): event is HttpResponse<unknown> =>
  event instanceof HttpResponse && event.headers.has(HEADER_X_AUTH_TOKEN);

const getAuthTokenFromHttpResponse = (event: HttpResponse<unknown>): string =>
  event.headers.get(HEADER_X_AUTH_TOKEN) as string;