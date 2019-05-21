import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Contact } from "../models/Contact";
import { Note } from "../models/Note";

export const ADD_CONTACT = "[CONTACTS] Add";
export const DELETE_CONTACT = "[CONTACTS] Remove";
export const LOAD_CONTACTS = "[CONTACTS] Load";
export const SET_CONTACTS = "[CONTACTS] Set";
export const CLEAR_CONTACTS = "[CONTACTS] Clear";
export const UPDATE_CONTACT = "[CONTACTS] Update";
export const ADD_NOTE = "[CONTACTS] Add Note";
export const DELETE_NOTE = "[CONTACTS] Delete Note";

export interface IAddNote {
  id: string;
  note: Note;
}

export interface IDeleteNote {
  id: string;
  noteId: string;
}

export class AddContact implements Action {
  readonly type = ADD_CONTACT;
  constructor(public payload: Contact) {}
}

export class AddNote implements Action {
  readonly type = ADD_NOTE;
  constructor(public payload: IAddNote) {}
}

export class DeleteNote implements Action {
  readonly type = DELETE_NOTE;
  constructor(public payload: IDeleteNote) {}
}

export class UpdateContact implements Action {
  readonly type = UPDATE_CONTACT;
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
  | ClearContacts
  | UpdateContact
  | AddNote
  | DeleteNote;
