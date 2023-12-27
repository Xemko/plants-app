import { ServerResponseBase } from '@plants-app/infra';

export interface SignInFormFields {
  phoneNumber: string;
}

export interface SignInResponse extends ServerResponseBase {
  // TODO implement when server is ready
}

export interface SignInResponseError extends ServerResponseBase {
  code: SignInResponseErrorCodes;
}

export enum SignInResponseErrorCodes {
  CannotFind = 404,
}
