import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ContactsState } from "../contacts.state";

const getContactsState = createFeatureSelector<ContactsState>("contacts");

export const getContacts = createSelector(
  getContactsState,
  state => state.contacts
);

export const getContactsLoaded = createSelector(
  getContactsState,
  state => state.contactsLoaded
);

export const getContactsLoading = createSelector(
  getContactsState,
  state => state.contactsLoading
);

export const getContactsLoadError = createSelector(
  getContactsState,
  state => state.contactsLoadError
);

export const getAddContactSuccess = createSelector(
  getContactsState,
  state => state.contactAdded
);

export const getAddContactLoading = createSelector(
  getContactsState,
  state => state.contactAddedLoading
);

export const getAddContactError = createSelector(
  getContactsState,
  state => state.contactAddedError
);
