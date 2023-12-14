import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SignInFormFields } from '../models/sign-in.interface';

export const signInPhoneNumberValidator = (): ValidatorFn => {
  return (control: AbstractControl<SignInFormFields['phoneNumber']>): ValidationErrors | null => {
    if (!/^05[\d+]{8}$/.test(control.value)) {
      return { 'signIn.phoneNumber.invalidErrorText': true };
    }

    return null;
  }
};
