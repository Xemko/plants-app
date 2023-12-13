import { FormControl } from '@angular/forms';
import { signInPhoneNumberValidator } from './sign-in.validators';

describe('signInPhoneNumberValidator', () => {

  it('should validate - has error required', () => {
    // GIVEN
    const control = new FormControl('', [signInPhoneNumberValidator()]);

    // THEN
    expect(control.errors).toEqual({ required: true });
  });

  it('should validate - has error errorText', () => {
    // GIVEN
    const control = new FormControl('0', [signInPhoneNumberValidator()]);

    // THEN
    expect(control.errors).toEqual({ errorText: true });

    // WHEN - not starts with 05
    control.setValue('0428565742');

    // THEN
    expect(control.errors).toEqual({ errorText: true });

    // WHEN - less than 10 digits
    control.setValue('052');

    // THEN
    expect(control.errors).toEqual({ errorText: true });

    // WHEN - less than 10 digits
    control.setValue('052856574');

    // THEN
    expect(control.errors).toEqual({ errorText: true });

    // WHEN - more than 10 digits
    control.setValue('05285657420');

    // THEN
    expect(control.errors).toEqual({ errorText: true });
  });

  it('should validate - no errors', () => {
    // GIVEN
    const control = new FormControl('0528565742', [signInPhoneNumberValidator()]);

    // THEN
    expect(control.errors).toEqual(null);
  });

});
