import { Action } from "@ngrx/store";
import * as UserActions from "../actions/user.actions";
import { Contact } from "../models/Contact";

const { SET_USER_LOGIN, SET_USER_INFO } = UserActions;

interface State {
  loggedIn: boolean;
  user: Contact | {};
}

const initialState: State = {
  loggedIn: false,
  user: {}
};

export function userReducer(state = initialState, action: UserActions.Actions) {
  switch (action.type) {
    case SET_USER_INFO: {
      return { ...state, user: action.payload };
    }

    case SET_USER_LOGIN: {
      return { ...state, loggedIn: action.payload };
    }

    default: {
      return state;
    }
  }
}
