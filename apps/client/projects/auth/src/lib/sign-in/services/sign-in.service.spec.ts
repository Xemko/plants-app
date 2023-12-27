import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../auth.service';
import { SignInResponse, SignInResponseError } from '../models/sign-in.interface';
import { SignInService } from './sign-in.service';

describe('SignInService', () => {
  let service: SignInService;
  let routerMock: Router;

  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('submit', () => {

    it('should call the api with correct url and payload', (done) => {
      // GIVEN
      const expectedResponse: SignInResponse = {
        code: 200,
        message: 'OK',
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

    it('should redirect to the /app route when response is valid', (done) => {
      // GIVEN
      const expectedResponse: SignInResponse = {
        code: 200,
        message: 'OK',
      };
      const navigateByUrlSpy = spyOn(routerMock, 'navigateByUrl').and.returnValue(Promise.resolve(true));
      authServiceSpy.signIn.and.returnValue(of(expectedResponse));

      // WHEN
      service.submit({ phoneNumber: '0528565742' }).subscribe({
        next: () => {
          // THEN
          expect(navigateByUrlSpy).toHaveBeenCalledOnceWith('/app');
          done();
        },
        error: fail,
      });
    });

    it('should call the api and catch an error with response', (done) => {
      // GIVEN
      const expectedResponse: SignInResponseError = { code: 404, message: 'Not Found' };
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

  });

  describe('getValidationErrorsByResponse', () => {

    it('should return null when response is not contains the errors', () => {
      // WHEN
      const result = service.getValidationErrorsByResponse({ errors: null } as unknown as SignInResponseError);

      // THEN
      expect(result).toBeNull();
    });

    it('should return null when response is contains the unknown errors', () => {
      // WHEN
      const result = service.getValidationErrorsByResponse({ code: 407, message: 'Unknown Error' } as unknown as SignInResponseError);

      // THEN
      expect(result).toBeNull();
    });

    it('should return errors object when response is contains the known errors', () => {
      // WHEN - 404
      const result = service.getValidationErrorsByResponse({ code: 404, message: 'Unknown Error' } as unknown as SignInResponseError);

      // THEN
      expect(result).toEqual({ 'signIn.phoneNumber.cannotFindErrorText': true });
    });

  });

});
