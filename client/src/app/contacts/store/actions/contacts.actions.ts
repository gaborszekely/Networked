import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Contact } from "@core/models/Contact";
import { Note } from "@core/models/Note";

export enum ContactsActionsEnum {
  ADD_CONTACT = "[Contacts] Add New Contact",
  DELETE_CONTACT = "[Contacts] Delete Contact",
  CONTACTS_REQUESTED = "[Contacts] Contacts Requested",
  SET_CONTACTS = "[Contacts] Set Contacts",
  CLEAR_CONTACTS = "[Contacts] Clear Contacts List",
  UPDATE_CONTACT = "[Contacts] Update Contact",
  ADD_NOTE = "[Contacts] Add Note For a Contact",
  DELETE_NOTE = "[Contacts] Delete Note For a Contact"
}

export interface IAddNote {
  id: string;
  note: Note;
}

export interface IDeleteNote {
  id: string;
  noteId: string;
}

export class AddContact implements Action {
  readonly type = ContactsActionsEnum.ADD_CONTACT;
  constructor(public payload: Contact) {}
}

export class AddNote implements Action {
  readonly type = ContactsActionsEnum.ADD_NOTE;
  constructor(public payload: IAddNote) {}
}

export class DeleteNote implements Action {
  readonly type = ContactsActionsEnum.DELETE_NOTE;
  constructor(public payload: IDeleteNote) {}
}

export class UpdateContact implements Action {
  readonly type = ContactsActionsEnum.UPDATE_CONTACT;
  constructor(public payload: Contact) {}
}

export class DeleteContact implements Action {
  readonly type = ContactsActionsEnum.DELETE_CONTACT;
  constructor(public payload: string) {}
}

export class ClearContacts implements Action {
  readonly type = ContactsActionsEnum.CLEAR_CONTACTS;
}

export class ContactsRequested implements Action {
  readonly type = ContactsActionsEnum.CONTACTS_REQUESTED;
}

export class SetContacts implements Action {
  readonly type = ContactsActionsEnum.SET_CONTACTS;
  constructor(public payload: Contact[]) {}
}

export type Actions =
  | AddContact
  | DeleteContact
  | ContactsRequested
  | SetContacts
  | ClearContacts
  | UpdateContact
  | AddNote
  | DeleteNote;
