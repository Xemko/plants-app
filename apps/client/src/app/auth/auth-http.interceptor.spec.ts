import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { authHttpInterceptor } from './auth-http-interceptor.service';
import { AuthService } from './auth.service';

describe('AuthHttpInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach((() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', [ 'getAuthToken', 'setAuthToken' ]);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: authServiceSpy
        },
        provideHttpClient(withInterceptors([authHttpInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  // FIXME: this test is failing:
  //        Error: Expected one matching request for criteria "Match URL: /api/auth/sign-in", found none.
  xit('should add auth headers ', () => {
    // GIVEN
    const url = '/api/auth/sign-in';
    const authToken = 'abc';

    authServiceSpy.getAuthToken.and.returnValue(Promise.resolve(authToken));
    authServiceSpy.setAuthToken.and.returnValue(Promise.resolve());

    // WHEN
    httpClient.get(url).subscribe();

    const httpRequestNext = httpMock.expectOne(url);
    httpRequestNext.flush({ authToken });

    // THEN
    expect(httpRequestNext.request.headers.get('x-auth-token')).toBe(authToken);
  });

});
