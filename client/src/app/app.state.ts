import { ActionReducerMap } from '@ngrx/store';
import {
  routerReducer,
  RouterReducerState,
  RouterStateSerializer
} from '@ngrx/router-store';
import { contactsReducer } from './reducers/contacts.reducer';
import { userReducer } from './core/store/reducers';
import { Contact } from './core/models/Contact';
import { UserState } from './core/store/core.state';

export interface AppState {
  readonly router: RouterReducerState<any>;
  readonly contacts: Contact[];
  readonly user: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  contacts: contactsReducer,
  user: userReducer
};
