import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { SignInFormFields } from '../models/sign-in.interface';

export const signInPhoneNumberValidator = (): ValidatorFn => {
  return (control: AbstractControl<SignInFormFields['phoneNumber']>): ValidationErrors | null => {
    if (Validators.required(control)) {
      return { required: true };
    }

    const value = control.value;

    if (!value.startsWith('0')) {
      return { errorText: true };
    }

    return null;
  }
};
