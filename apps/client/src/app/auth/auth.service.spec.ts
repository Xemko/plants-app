import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { SignInResponse } from '../sign-in/models/sign-in.interface';
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
        authToken: 'abc',
        errors: null,
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
        url: '/api/sign-in',
      });
      httpRequestNext.flush(expectedResponse);
      httpMock.verify();
    });

    it('should call the api and catch an error with response', (done) => {
      // GIVEN
      const expectedResponse: SignInResponse = {
        authToken: null,
        errors: [ { code: 404, message: 'Not Found' } ],
      };

      // WHEN
      service.signIn({ phoneNumber: '0528565742' }).subscribe({
        next: fail,
        error: response => {
          // THEN
          expect(response).toEqual(expectedResponse);
          done();
        }
      });

      const httpRequestNext = httpMock.expectOne('/api/sign-in');
      httpRequestNext.flush(expectedResponse, { status: 404, statusText: 'Bad Request' });
      httpMock.verify();
    });

  });

  describe('hasAccess', () => {

    it('should return true when authToken is valid', (done) => {
      // GIVEN
      storageSpy.get.and.returnValue(Promise.resolve('abc'));

      // WHEN
      service.hasAccess().subscribe(result => {
        // THEN
        expect(result).toBeTrue();
        done();
      });
    });

    it('should return false when authToken is invalid', (done) => {
      // GIVEN
      storageSpy.get.and.returnValue(Promise.resolve(undefined));

      // WHEN
      service.hasAccess().subscribe(result => {
        // THEN
        expect(result).toBeFalse();
        done();
      });
    });

  });

});
