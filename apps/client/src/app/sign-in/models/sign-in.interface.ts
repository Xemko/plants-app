export interface SignInFormFields {
  phoneNumber: string;
}

export interface SignInResponse {
  authToken: null | string;
  errors?: null | SignInResponseError[];
}

export interface SignInResponseError {
  code: SignInResponseErrorCodes;
  message: string;
}

export enum SignInResponseErrorCodes {
  CannotFind = 404,
}
