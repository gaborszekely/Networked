import { Action } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';
import { User } from '../core/models/User';
import { Contact } from '../core/models/Contact';

const { SET_USER, SET_USER_LOGIN, SET_USER_INFO } = UserActions;

interface IState {
  loggedIn: boolean;
  user: User | {};
  userInfo: Contact | {};
}

const initialState: IState = {
  loggedIn: false,
  user: {},
  userInfo: {}
};

export function userReducer(
  state: IState = initialState,
  action: UserActions.Actions
) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };

    case SET_USER_INFO:
      return { ...state, userInfo: action.payload };

    case SET_USER_LOGIN:
      return { ...state, loggedIn: action.payload };

    default:
      return state;
  }
}
