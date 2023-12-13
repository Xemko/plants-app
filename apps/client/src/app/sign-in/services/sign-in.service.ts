import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable, throwError } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { SignInFormFields, SignInResponse } from '../models/sign-in.interface';

@Injectable()
export class SignInService {
  private http = inject(HttpClient);
  private router = inject(Router);

  submit(value: SignInFormFields): Observable<SignInResponse> {
    return this.http.post<SignInResponse>('/api/sign-in', value).pipe(
      tap(response => {
        this.validateSubmitResponse(response);
      }),
      exhaustMap(response => from(this.router.navigateByUrl('/app/dashboard')).pipe(
        map(() => response)
      )),
      catchError(response => throwError(() => this.extractResponseError(response))),
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
