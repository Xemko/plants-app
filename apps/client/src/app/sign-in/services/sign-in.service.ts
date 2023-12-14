import { inject, Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { from, Observable, throwError } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { SignInFormFields, SignInResponse, SignInResponseErrorCodes } from '../models/sign-in.interface';

@Injectable()
export class SignInService {
  private authService = inject(AuthService);
  private router = inject(Router);

  submit(value: SignInFormFields): Observable<SignInResponse> {
    return this.authService.signIn(value).pipe(
      exhaustMap(response => this.navigateToTheApp().pipe(
        map(() => response)
      )),
      catchError(response => throwError(() => response)),
    );
  }

  getValidationErrorsByResponse(response: SignInResponse): ValidationErrors | null {
    if (Array.isArray(response.errors)) {
      const errors = response.errors.reduce((acc, error): ValidationErrors => {
        switch (error.code) {
          case SignInResponseErrorCodes.CannotFind:
            return Object.assign(acc, { 'signIn.phoneNumber.cannotFindErrorText': true });

          default:
            return acc;
        }
      }, {});
      if (Object.keys(errors).length) {
        return errors;
      }
    }
    return null;
  }

  private navigateToTheApp(): Observable<boolean> {
    return from(this.router.navigateByUrl('/app/dashboard'));
  }

}
