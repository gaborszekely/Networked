import { Action } from '@ngrx/store';
import { Contact } from '../core/models/Contact';
import * as ContactActions from '../actions/contacts.actions';

const initialState: Contact[] = [];

const {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CONTACTS,
  CLEAR_CONTACTS,
  UPDATE_CONTACT,
  ADD_NOTE,
  DELETE_NOTE
} = ContactActions;

export function contactsReducer(
  state: Contact[] = initialState,
  action: ContactActions.Actions
) {
  switch (action.type) {
    case SET_CONTACTS:
      return action.payload;

    case ADD_CONTACT:
      return [...state, action.payload];

    case DELETE_CONTACT:
      return state.filter(i => i._id !== action.payload);

    case UPDATE_CONTACT:
      return state.map(contact =>
        contact._id === action.payload._id ? action.payload : contact
      );

    case CLEAR_CONTACTS:
      return [];

    case ADD_NOTE:
      return state.map(contact =>
        contact._id === action.payload.id
          ? { ...contact, notes: [...contact.notes, action.payload.note] }
          : contact
      );

    case DELETE_NOTE:
      return state.map(contact =>
        contact._id === action.payload.id
          ? {
              ...contact,
              notes: contact.notes.filter(i => i._id !== action.payload.noteId)
            }
          : contact
      );
    default:
      return state;
  }
}
