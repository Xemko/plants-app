import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { SignInResponse } from '../models/sign-in.interface';
import { SignInService } from './sign-in.service';

describe('SignInService', () => {
  let service: SignInService;
  let routerMock: Router;

  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach((() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', [ 'signIn' ]);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
        SignInService,
      ],
    });

    service = TestBed.inject(SignInService);
    routerMock = TestBed.inject(Router);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('submit', () => {

    it('should call the api with correct url and payload', (done) => {
      // GIVEN
      const expectedResponse: SignInResponse = {
        authToken: 'abc',
        errors: null,
      };
      spyOn(routerMock, 'navigateByUrl').and.returnValue(Promise.resolve(true));
      authServiceSpy.signIn.and.returnValue(of(expectedResponse));

      // WHEN
      service.submit({ phoneNumber: '0528565742' }).subscribe({
        next: response => {
          // THEN
          expect(response).toEqual(expectedResponse);
          done();
        },
        error: fail,
      });
    });

    it('should redirect to the /app/dashboard route when response is valid', (done) => {
      // GIVEN
      const expectedResponse: SignInResponse = {
        authToken: 'abc',
        errors: null,
      };
      const navigateByUrlSpy = spyOn(routerMock, 'navigateByUrl').and.returnValue(Promise.resolve(true));
      authServiceSpy.signIn.and.returnValue(of(expectedResponse));

      // WHEN
      service.submit({ phoneNumber: '0528565742' }).subscribe({
        next: () => {
          // THEN
          expect(navigateByUrlSpy).toHaveBeenCalledOnceWith('/app/dashboard');
          done();
        },
        error: fail,
      });
    });

    it('should call the api and catch an error with response', (done) => {
      // GIVEN
      const expectedResponse: SignInResponse = {
        authToken: null,
        errors: [ { code: 404, message: 'Not Found' } ],
      };
      spyOn(routerMock, 'navigateByUrl').and.returnValue(Promise.resolve(true));
      authServiceSpy.signIn.and.returnValue(throwError(() => expectedResponse));

      // WHEN
      service.submit({ phoneNumber: '0528565742' }).subscribe({
        next: fail,
        error: response => {
          // THEN
          expect(response).toEqual(expectedResponse);
          done();
        }
      });
    });

    it('should redirect to the /error route when response is invalid', (done) => {
      // GIVEN
      const expectedResponse: SignInResponse = {
        authToken: null,
        errors: [ { code: 404, message: 'Not Found' } ],
      };
      const navigateByUrlSpy = spyOn(routerMock, 'navigateByUrl').and.returnValue(Promise.resolve(true));
      authServiceSpy.signIn.and.returnValue(throwError(() => expectedResponse));

      // WHEN
      service.submit({ phoneNumber: '0528565742' }).subscribe({
        next: fail,
        error: response => {
          // THEN
          expect(navigateByUrlSpy).toHaveBeenCalledOnceWith('/error');
          done();
        }
      });
    });

  });

});
