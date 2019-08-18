import * as ContactActions from "../actions/contacts.actions";
import { ContactsState } from "../contacts.state";
import { Contact } from "@core/models/Contact";
import { ContactsActionsEnum } from "../actions/contacts.actions";

export function contactsReducer(
  state = new ContactsState(),
  action: ContactActions.Actions
): ContactsState {
  switch (action.type) {
    case ContactsActionsEnum.SET_CONTACTS: {
      return {
        ...state,
        contactsLoaded: true,
        contacts: action.payload
      };
    }

    case ContactsActionsEnum.ADD_CONTACT: {
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      };
    }

    case ContactsActionsEnum.DELETE_CONTACT: {
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload
        )
      };
    }

    case ContactsActionsEnum.UPDATE_CONTACT: {
      return {
        ...state,
        contacts: state.contacts.map(contact => {
          if (contact._id === action.payload._id) {
            return action.payload;
          }
          return contact;
        })
      };
    }

    case ContactsActionsEnum.CLEAR_CONTACTS: {
      return {
        ...state,
        contacts: []
      };
    }

    case ContactsActionsEnum.ADD_NOTE: {
      return {
        ...state,
        contacts: state.contacts.map(contact => {
          if (contact._id === action.payload.id) {
            return {
              ...contact,
              notes: [...contact.notes, action.payload.note]
            };
          }
          return contact;
        })
      };
    }

    case ContactsActionsEnum.DELETE_NOTE: {
      return {
        ...state,
        contacts: state.contacts.map(contact => {
          if (contact._id === action.payload.id) {
            return {
              ...contact,
              notes: contact.notes.filter(i => i._id !== action.payload.noteId)
            };
          }
          return contact;
        })
      };
    }

    default: {
      return state;
    }
  }
}
