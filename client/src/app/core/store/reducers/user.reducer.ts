import { UserState } from "../core.state";
import * as fromUserActions from "../actions/user.actions";
import { UserActionsEnum, UserLoginSuccessful } from '../actions/user.actions';

export function userReducer(state = new UserState(), action: fromUserActions.UserActionTypes): UserState {
  switch(action.type) {
    case UserActionsEnum.USER_LOGIN_REQUESTED: {
      return {
        ...state,
        loading: true,
      };
    }
    case UserActionsEnum.USER_LOGIN_SUCCESSFUL: {
      return {
        ...state,
        loggedIn: true,
        error: false,
        loading: false,
        user: (action as UserLoginSuccessful).user
      };
    }

    case UserActionsEnum.USER_LOGIN_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }

    default: {
      return state;
    }
  }
}