import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { exhaustMap, from, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ServerResponseBase } from '@plants-app/infra';
import { SignInFormFields, SignInResponse } from './sign-in/models/sign-in.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private storage = inject(Storage);

  async getAuthToken(): Promise<string> {
    return await this.storage.get('authToken');
  }

  async setAuthToken(authToken: string): Promise<void> {
    await this.storage.set('authToken', authToken);
  }

  signIn(value: SignInFormFields): Observable<SignInResponse> {
    return this.http.post<SignInResponse>('/api/auth/sign-in', value).pipe(
      tap(response => {
        this.validateSignInResponse(response);
      }),
      catchError(response => throwError(() => this.extractResponseError(response))),
    );
  }

  validate(): Observable<ServerResponseBase> {
    return this.http.get<ServerResponseBase>('/api/auth/validate').pipe(
      catchError(response => throwError(() => this.extractResponseError(response))),
    );
  }

  hasAccess(): Observable<boolean> {
    return from(this.getAuthToken()).pipe(
      map(authToken => !!authToken),
      exhaustMap((hasAuthToken: boolean) => {
        if (!hasAuthToken) {
          return of(false);
        }
        return this.validate().pipe(
          map(() => hasAuthToken),
          catchError(() => of(false)),
        );
      }),
    );
  }

  private validateSignInResponse(response: SignInResponse): void {
    // TODO implement when server is ready
  }

  private extractResponseError(response: HttpErrorResponse): ServerResponseBase {
    // TODO implement when server is ready
    return response.error;
  }

}
