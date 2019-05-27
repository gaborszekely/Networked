import { Action } from "@ngrx/store";
import { Contact } from "../models/Contact";

export const SET_USER_LOGIN = "[USER] Login";
export const SET_USER_INFO = "[USER] Info";

export class SetLogin implements Action {
  readonly type = SET_USER_LOGIN;
  constructor(public payload: boolean) {}
}

export class SetUserInfo implements Action {
  readonly type = SET_USER_INFO;
  constructor(public payload: Contact) {}
}

export type Actions = SetLogin | SetUserInfo;
