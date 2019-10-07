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
      if (state.contactsLoaded) {
        return state;
      }
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
            return { ...contact, ...action.payload };
          }
          return contact;
        })
      };
    }

    case ContactsActionsEnum.CLEAR_CONTACTS: {
      return {
        ...state,
        contacts: [],
        contactsLoading: false,
        contactsLoaded: false
      };
    }

    case ContactsActionsEnum.ADD_NOTE_REQUESTED: {
      return {
        ...state,
        addNoteError: false
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
        }),
        addNoteError: false
      };
    }

    case ContactsActionsEnum.ADD_NOTE_ERROR: {
      return {
        ...state,
        addNoteError: true
      };
    }

    case ContactsActionsEnum.DELETE_NOTE_REQUESTED: {
      return {
        ...state,
        deleteNoteError: false
      };
    }

    case ContactsActionsEnum.DELETE_NOTE: {
      return {
        ...state,
        deleteNoteError: false,
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

    case ContactsActionsEnum.DELETE_NOTE_ERROR: {
      return {
        ...state,
        deleteNoteError: true
      };
    }

    default: {
      return state;
    }
  }
}
