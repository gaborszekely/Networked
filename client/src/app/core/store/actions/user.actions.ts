import { Action } from "@ngrx/store";
import { User } from "../../models/User";
import { IJwtPayload } from "../../interfaces/JwtPayload";

export enum UserActionsEnum {
  SET_USER_LOGIN = "[User] Login User",
  USER_SET = "[User] Set User",
  USER_INFO_SET = "[User] Set User Info",
  USER_INFO_LOADED = "[User] Load User Info",
  LOGIN_SET = "[User] Login Set"
}

export class UserSet implements Action {
  readonly type = UserActionsEnum.USER_SET;
  constructor(public payload: IJwtPayload) {}
}

export class UserInfoLoaded implements Action {
  readonly type = UserActionsEnum.USER_INFO_LOADED;
  constructor(public payload: string) {}
}

export class UserInfoSet implements Action {
  readonly type = UserActionsEnum.USER_INFO_SET;
  constructor(public payload: User) {}
}

export class LoginSet implements Action {
  readonly type = UserActionsEnum.LOGIN_SET;
  constructor(public payload: boolean) {}
}

export type Actions = UserSet | UserInfoSet | UserInfoLoaded | LoginSet;
