export interface SignInFormFields {
  phoneNumber: string;
}

export interface SignInResponse {
  authToken: null | string;
  errors?: null | unknown;
}