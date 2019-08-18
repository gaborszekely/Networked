import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ContactsState } from "../contacts.state";

const contactsState = createFeatureSelector<ContactsState>("contacts");

export const getContacts = createSelector(
  contactsState,
  state => state.contacts
);

export const getContactsLoaded = createSelector(
  contactsState,
  state => state.contactsLoaded
);
