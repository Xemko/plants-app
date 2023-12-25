import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage-angular';
import { of, throwError } from 'rxjs';
import { ENVIRONMENT } from '../common/models/environment.model';
import { getTranslocoTestingModule } from '../common/transloco/transloco-testing.module';
import { SignInResponse, SignInResponseError } from './models/sign-in.interface';
import { SignInService } from './services/sign-in.service';

import { SignInPage } from './sign-in.page';

describe('SignInPage', () => {
  let component: SignInPage;
  let fixture: ComponentFixture<SignInPage>;

  let signInServiceSpy: jasmine.SpyObj<SignInService>;

  beforeEach(async () => {
    signInServiceSpy = jasmine.createSpyObj('SignInService', [ 'getValidationErrorsByResponse', 'submit' ]);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        {
          provide: ENVIRONMENT,
          useValue: { appName: 'PLANTS_APP' },
        },
        {
          provide: Storage,
          useValue: {},
        },
        getTranslocoTestingModule(),
      ],
    });

    TestBed.overrideComponent(SignInPage, {
      add: {
        providers: [
          {
            provide: SignInService,
            useValue: signInServiceSpy,
          }
        ]
      }
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // THEN
    expect(component).toBeTruthy();
  });

  it('should create with initial values', () => {
    // THEN
    expect(component.form.value).toEqual({ phoneNumber: '' });
    expect(component.appName).toEqual('PLANTS_APP');
  });

  describe('submit', () => {

    it('should not call signInService.submit when form is invalid', () => {
      // GIVEN
      component.form.get('phoneNumber')?.setErrors({ someError: true });

      expect(component.form.valid).toBeFalse();

      // WHEN
      component.submit();

      // THEN
      expect(signInServiceSpy.submit).not.toHaveBeenCalled();
    });

    it('should call signInService.submit when form is valid', () => {
      // GIVEN
      signInServiceSpy.submit.and.returnValue(of({} as SignInResponse));
      component.form.get('phoneNumber')?.setValue('0528565742');
      component.form.get('phoneNumber')?.setErrors(null);

      expect(component.form.valid).toBeTrue();

      // WHEN
      component.submit();

      // THEN
      expect(signInServiceSpy.submit).toHaveBeenCalledOnceWith({ phoneNumber: '0528565742' });
    });

  });

  it('should set phoneNumber errors when signInService.submit returns an error', () => {
    // GIVEN
    const expectedResponse: SignInResponseError = { code: 404, message: 'Not Found' };
    signInServiceSpy.submit.and.returnValue(throwError(() => expectedResponse));
    signInServiceSpy.getValidationErrorsByResponse.and.returnValue({ notFoundError: true });

    component.form.get('phoneNumber')?.setValue('0528565742');
    component.form.get('phoneNumber')?.setErrors(null);

    // WHEN
    component.submit();

    // THEN
    expect(component.form.get('phoneNumber')?.errors).toEqual({ notFoundError: true });
  });

});
