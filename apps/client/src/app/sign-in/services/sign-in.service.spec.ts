import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SignInResponse } from '../models/sign-in.interface';
import { SignInService } from './sign-in.service';

describe('SignInService', () => {
  let service: SignInService;
  let httpMock: HttpTestingController;
  let routerMock: Router;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        SignInService,
      ],
    });

    service = TestBed.inject(SignInService);
    httpMock = TestBed.inject(HttpTestingController);
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

      // WHEN
      service.submit({ phoneNumber: '0528565742' }).subscribe({
        next: response => {
          // THEN
          expect(response).toEqual(expectedResponse);
          done();
        },
        error: fail,
      });

      const httpRequestNext = httpMock.expectOne({
        method: 'POST',
        url: '/api/sign-in',
      });
      httpRequestNext.flush(expectedResponse);
      httpMock.verify();
    });

    it('should redirect to the /app/dashboard route when response is valid', (done) => {
      // GIVEN
      const expectedResponse: SignInResponse = {
        authToken: 'abc',
        errors: null,
      };
      const navigateByUrlSpy = spyOn(routerMock, 'navigateByUrl').and.returnValue(Promise.resolve(true));

      // WHEN
      service.submit({ phoneNumber: '0528565742' }).subscribe({
        next: () => {
          // THEN
          expect(navigateByUrlSpy).toHaveBeenCalledOnceWith('/app/dashboard');
          done();
        },
        error: fail,
      });

      const httpRequestNext = httpMock.expectOne('/api/sign-in');
      httpRequestNext.flush(expectedResponse);
      httpMock.verify();
    });

    it('should call the api and catch an error with response', (done) => {
      // GIVEN
      const expectedResponse: SignInResponse = {
        authToken: null,
        errors: {},
      };
      const navigateByUrlSpy = spyOn(routerMock, 'navigateByUrl').and.returnValue(Promise.resolve(true));

      // WHEN
      service.submit({ phoneNumber: '0528565742' }).subscribe({
        next: fail,
        error: response => {
          console.log({response})
          // THEN
          expect(response).toEqual(expectedResponse);
          expect(navigateByUrlSpy).not.toHaveBeenCalled();
          done();
        }
      });

      const httpRequestNext = httpMock.expectOne('/api/sign-in');
      httpRequestNext.flush(expectedResponse, { status: 404, statusText: 'Bad Request' });
      httpMock.verify();
    });

  });

});
