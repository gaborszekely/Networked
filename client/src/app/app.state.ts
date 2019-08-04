import { ActionReducerMap } from '@ngrx/store';
import {
  routerReducer,
  RouterReducerState,
  RouterStateSerializer
} from '@ngrx/router-store';
import { contactsReducer } from './reducers/contacts.reducer';
import { userReducer } from './reducers/user.reducer';
import { Contact } from './core/models/Contact';

export interface AppState {
  readonly router: RouterReducerState<any>;
  readonly contacts: Contact[];
  readonly user: Contact | {};
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  contacts: contactsReducer,
  user: userReducer
};
