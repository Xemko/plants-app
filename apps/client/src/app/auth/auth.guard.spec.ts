import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Route, Router, RouterOutlet } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Component({ standalone: true, template: '' })
class SignInComponent {}

@Component({
  standalone: true,
  imports: [ RouterOutlet ],
  template: '<router-outlet></router-outlet>'
})
class AppComponent {}

describe('authGuard', () => {
  let routes: Route[];
  let router: Router;

  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', [ 'hasAccess' ]);
    routes = [
      {
        path: 'sign-in',
        component: SignInComponent,
        canActivate: [ authGuard ],
      },
      {
        path: 'app',
        component: AppComponent,
        canActivate: [ authGuard ],
      },
    ];

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        { provide: AuthService, useValue: authService },
        provideRouter(routes),
      ],
    });

    router = TestBed.inject(Router);
  });

  it('should allow to activate the /sign-in route, when has no access', async () => {
    // GIVEN
    authService.hasAccess.and.returnValue(of(false));

    // WHEN
    await RouterTestingHarness.create('/sign-in')

    // THEN
    expect(router.url).toBe('/sign-in');
  });

  it('should not allow to activate the /sign-in route and redirect to the /app route, when has the access', async () => {
    // GIVEN
    authService.hasAccess.and.returnValue(of(true));

    // WHEN
    await RouterTestingHarness.create('/sign-in')

    // THEN
    expect(router.url).toBe('/app');
  });

  it('should not allow to activate the /app route and redirect to the /sign-in, when has no access', async () => {
    // GIVEN
    authService.hasAccess.and.returnValue(of(false));

    // WHEN
    await RouterTestingHarness.create('/app');

    // THEN
    expect(router.url).toBe('/sign-in');
  });

  it('should allow to activate the /app route, when has the access', async () => {
    // GIVEN
    authService.hasAccess.and.returnValue(of(true));

    // WHEN
    await RouterTestingHarness.create('/app')

    // THEN
    expect(router.url).toBe('/app');
  });

});
