import { FormControl } from '@angular/forms';
import { signInPhoneNumberValidator } from './sign-in.validators';

describe('signInPhoneNumberValidator', () => {

  it('should validate - has error signIn.phoneNumber.invalidErrorText', () => {
    // GIVEN
    const control = new FormControl('', [signInPhoneNumberValidator()]);

    // THEN
    expect(control.errors).toEqual({ 'signIn.phoneNumber.invalidErrorText': true });

    // WHEN - not starts with 05
    control.setValue('0428565742');

    // THEN
    expect(control.errors).toEqual({ 'signIn.phoneNumber.invalidErrorText': true });

    // WHEN - not starts with 05
    control.setValue('0428565742');

    // THEN
    expect(control.errors).toEqual({ 'signIn.phoneNumber.invalidErrorText': true });

    // WHEN - less than 10 digits
    control.setValue('0');

    // THEN
    expect(control.errors).toEqual({ 'signIn.phoneNumber.invalidErrorText': true });

    // WHEN - less than 10 digits
    control.setValue('052');

    // THEN
    expect(control.errors).toEqual({ 'signIn.phoneNumber.invalidErrorText': true });

    // WHEN - less than 10 digits
    control.setValue('052856574');

    // THEN
    expect(control.errors).toEqual({ 'signIn.phoneNumber.invalidErrorText': true });

    // WHEN - more than 10 digits
    control.setValue('05285657420');

    // THEN
    expect(control.errors).toEqual({ 'signIn.phoneNumber.invalidErrorText': true });

    // WHEN - non-digits
    control.setValue('abc');

    // THEN
    expect(control.errors).toEqual({ 'signIn.phoneNumber.invalidErrorText': true });
  });

  it('should validate - no errors', () => {
    // GIVEN
    const control = new FormControl('0528565742', [signInPhoneNumberValidator()]);

    // THEN
    expect(control.errors).toEqual(null);
  });

});
