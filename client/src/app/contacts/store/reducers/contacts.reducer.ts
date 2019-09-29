import { ContactsState } from "../contacts.state";
import {
  ContactsActions,
  ContactsActionsEnum
} from "../actions/contacts.actions";

export function contactsReducer(
  state = new ContactsState(),
  action: ContactsActions
): ContactsState {
  switch (action.type) {
    case ContactsActionsEnum.CONTACTS_REQUESTED: {
      return {
        ...state,
        contactsLoading: true,
        contactsLoaded: false,
        contactsLoadError: false
      };
    }

    case ContactsActionsEnum.CONTACTS_LOADED: {
      return {
        ...state,
        contactsLoaded: true,
        contactsLoading: false,
        contactsLoadError: false,
        contacts: action.payload
      };
    }

    case ContactsActionsEnum.CONTACTS_LOAD_ERROR: {
      return {
        ...state,
        contactsLoading: false,
        contactsLoaded: false,
        contactsLoadError: true
      };
    }

    case ContactsActionsEnum.ADD_CONTACT_REQUESTED: {
      return {
        ...state,
        contactAdded: false,
        contactAddedError: false,
        contactAddedLoading: true,
        contactAddedLoaded: false
      };
    }

    case ContactsActionsEnum.CONTACT_ADDED: {
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        contactAdded: true,
        contactAddedError: false,
        contactAddedLoading: false,
        contactAddedLoaded: true
      };
    }

    case ContactsActionsEnum.CONTACT_ADDED_ERROR: {
      return {
        ...state,
        contactAdded: false,
        contactAddedError: true,
        contactAddedLoading: false,
        contactAddedLoaded: true
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
