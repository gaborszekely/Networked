import { Action } from "@ngrx/store";
import { Contact } from "../models/Contact";
import * as ContactActions from "../actions/contacts.actions";

const initialState: Contact[] = [];

const { ADD_CONTACT, DELETE_CONTACT, SET_CONTACTS } = ContactActions;

export function contactsReducer(
  state: Contact[] = initialState,
  action: ContactActions.Actions
) {
  switch (action.type) {
    case SET_CONTACTS: {
      return action.payload;
    }

    case ADD_CONTACT: {
      return [...state, action.payload];
    }

    case DELETE_CONTACT: {
      return state.filter(i => i._id !== action.payload);
    }

    default: {
      return state;
    }
  }
}
