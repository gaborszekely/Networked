import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Contact } from "../models/Contact";

export const ADD_CONTACT = "[CONTACTS] Add";
export const DELETE_CONTACT = "[CONTACTS] Remove";
export const LOAD_CONTACTS = "[CONTACTS] Load";
export const SET_CONTACTS = "[CONTACTS] Set";
export const CLEAR_CONTACTS = "[CONTACTS] Clear";

export class AddContact implements Action {
  readonly type = ADD_CONTACT;
  constructor(public payload: Contact) {}
}

export class DeleteContact implements Action {
  readonly type = DELETE_CONTACT;
  constructor(public payload: string) {}
}

export class ClearContacts implements Action {
  readonly type = CLEAR_CONTACTS;
}

export class LoadContacts implements Action {
  readonly type = LOAD_CONTACTS;
}

export class SetContacts implements Action {
  readonly type = SET_CONTACTS;
  constructor(public payload: Contact[]) {}
}

export type Actions =
  | AddContact
  | DeleteContact
  | LoadContacts
  | SetContacts
  | ClearContacts;
