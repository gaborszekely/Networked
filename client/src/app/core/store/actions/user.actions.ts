import { Action } from '@ngrx/store';
import { UserLoginInfo } from '../../interfaces/UserLoginInfo';

export enum UserActionsEnum {
  USER_LOGIN_REQUESTED = "[User] User login requested",
  USER_LOGIN_SUCCESSFUL = "[User] User login successful",
  USER_LOGIN_ERROR = "[User] User login error",
}

export class UserLoginRequested implements Action {
  readonly type = UserActionsEnum.USER_LOGIN_REQUESTED;
  constructor(public userLoginInfo: UserLoginInfo) {}
}

export class UserLoginSuccessful implements Action {
  readonly type = UserActionsEnum.USER_LOGIN_SUCCESSFUL;
  constructor(public user: any) {}
}

export class UserLoginError implements Action {
  readonly type = UserActionsEnum.USER_LOGIN_ERROR;
  constructor() {}
}

export type UserActionTypes = UserLoginRequested | UserLoginSuccessful | UserLoginError;