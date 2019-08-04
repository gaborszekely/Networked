import { Action } from '@ngrx/store';
import { Contact } from '../core/models/Contact';
import { User } from '../core/models/User';
import { IJwtPayload } from '../core/interfaces/JwtPayload';

export const SET_USER_LOGIN = '[USER] Login';
export const SET_USER = '[USER] Set User';
export const SET_USER_INFO = '[USER] Set Info';
export const LOAD_USER_INFO = '[USER] Load Info';

export class SetLogin implements Action {
  readonly type = SET_USER_LOGIN;
  constructor(public payload: boolean) {}
}

export class SetUser implements Action {
  readonly type = SET_USER;
  constructor(public payload: IJwtPayload) {}
}

export class LoadUserInfo implements Action {
  readonly type = LOAD_USER_INFO;
  constructor(public payload: string) {}
}

export class SetUserInfo implements Action {
  readonly type = SET_USER_INFO;
  constructor(public payload: User) {}
}

export type Actions = SetLogin | SetUser | SetUserInfo | LoadUserInfo;
