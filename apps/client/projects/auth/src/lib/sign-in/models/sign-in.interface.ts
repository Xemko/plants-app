import { ServerResponseBase } from '@plants-app/shared';
import { User } from '../../user/models/user.interface';

export interface SignInFormFields {
  phoneNumber: string;
}

export interface SignInResponse extends ServerResponseBase {
  user: User;
}

export interface SignInResponseError extends ServerResponseBase {
  code: SignInResponseErrorCodes;
}

export enum SignInResponseErrorCodes {
  CannotFind = 404,
}
