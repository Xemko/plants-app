import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { exhaustMap, map } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { SignInFormFields, SignInResponse } from '../models/sign-in.interface';

@Injectable()
export class SignInService {
  private authService = inject(AuthService);
  private router = inject(Router);

  submit(value: SignInFormFields): Observable<SignInResponse> {
    return this.authService.signIn(value).pipe(
      exhaustMap(response => this.navigateToTheApp().pipe(
        map(() => response)
      ))
    );
  }

  private navigateToTheApp(): Observable<boolean> {
    return from(this.router.navigateByUrl('/app/dashboard'));
  }

}
