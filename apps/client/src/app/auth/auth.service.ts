import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SignInFormFields, SignInResponse } from '../sign-in/models/sign-in.interface';

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
        this.validateSubmitResponse(response);
      }),
      catchError(response => throwError(() => this.extractResponseError(response))),
    );
  }

  hasAccess(): Observable<boolean> {
    return from(this.getAuthToken()).pipe(
      // TODO validate the authToken against the service.
      // exaustMap(authToken => ...),
      map(authToken => !!authToken),
    );
  }

  private validateSubmitResponse(response: SignInResponse): void {
    // TODO implement when server is ready
  }

  private extractResponseError(response: HttpErrorResponse) {
    // TODO implement when server is ready
    return response.error;
  }

}
