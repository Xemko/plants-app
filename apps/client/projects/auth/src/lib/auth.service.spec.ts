import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { of, throwError } from 'rxjs';
import { SignInResponse, SignInResponseError } from './sign-in/models/sign-in.interface';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  let storageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('Storage', [ 'set', 'get' ]);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: Storage,
          useValue: storageSpy,
        },
        AuthService,
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signIn', () => {

    it('should call the api with correct url and payload', (done) => {
      // GIVEN
      const expectedResponse: SignInResponse = {
        code: 200,
        message: 'Success',
      };

      // WHEN
      service.signIn({ phoneNumber: '0528565742' }).subscribe({
        next: response => {
          // THEN
          expect(response).toEqual(expectedResponse);
          done();
        },
        error: fail,
      });

      const httpRequestNext = httpMock.expectOne({
        method: 'POST',
        url: '/api/auth/sign-in',
      });
      httpRequestNext.flush(expectedResponse);
      httpMock.verify();
    });

    it('should call the api and catch an error with response', (done) => {
      // GIVEN
      const expectedResponse: SignInResponseError = { code: 404, message: 'Not Found' };

      // WHEN
      service.signIn({ phoneNumber: '0528565742' }).subscribe({
        next: fail,
        error: response => {
          // THEN
          expect(response).toEqual(expectedResponse);
          done();
        }
      });

      const httpRequestNext = httpMock.expectOne('/api/auth/sign-in');
      httpRequestNext.flush(expectedResponse, { status: 404, statusText: 'Bad Request' });
      httpMock.verify();
    });

  });

  describe('validate', () => {

    it('should call the api with correct url and payload', (done) => {
      // GIVEN
      const expectedResponse: SignInResponse = { code: 200, message: 'Valid token' };

      // WHEN
      service.validate().subscribe({
        next: response => {
          // THEN
          expect(response).toEqual(expectedResponse);
          done();
        },
        error: fail,
      });

      const httpRequestNext = httpMock.expectOne('/api/auth/validate');
      httpRequestNext.flush(expectedResponse);
      httpMock.verify();
    });

    it('should call the api and catch an error with response', (done) => {
      // GIVEN
      const expectedResponse: SignInResponse = { code: 401, message: 'Invalid token' };

      // WHEN
      service.validate().subscribe({
        next: fail,
        error: response => {
          // THEN
          expect(response).toEqual(expectedResponse);
          done();
        },
      });

      const httpRequestNext = httpMock.expectOne('/api/auth/validate');
      httpRequestNext.flush(expectedResponse, { status: 401, statusText: 'Unauthorized' });
      httpMock.verify();
    });

  });

  describe('hasAccess', () => {

    it('should return true when authToken exists and is valid', (done) => {
      // GIVEN
      storageSpy.get.and.returnValue(Promise.resolve('abc'));
      const validateSpy = spyOn(service, 'validate').and.returnValue(of({ code: 200, message: 'Valid token' }));

      // WHEN
      service.hasAccess().subscribe(result => {
        // THEN
        expect(result).toBeTrue();
        expect(validateSpy).toHaveBeenCalled();
        done();
      });
    });

    it('should return false when authToken exists and not valid', (done) => {
      // GIVEN
      storageSpy.get.and.returnValue(Promise.resolve('abc'));
      const validateSpy = spyOn(service, 'validate').and.returnValue(throwError(() => new HttpErrorResponse({
        error: { code: 401, message: 'Invalid token' },
      })));

      // WHEN
      service.hasAccess().subscribe(result => {
        // THEN
        expect(result).toBeFalse();
        expect(validateSpy).toHaveBeenCalled();
        done();
      });
    });

    it('should return false when authToken not exists', (done) => {
      // GIVEN
      storageSpy.get.and.returnValue(Promise.resolve(undefined));
      const validateSpy = spyOn(service, 'validate').and.stub();

      // WHEN
      service.hasAccess().subscribe(result => {
        // THEN
        expect(result).toBeFalse();
        expect(validateSpy).not.toHaveBeenCalled();
        done();
      });
    });

  });

});
