import { Action } from "@ngrx/store";
import * as UserActions from "../actions/user.actions";
import { User } from "../../models/User";
import { Contact } from "../../models/Contact";
import { UserActionsEnum } from "../actions/user.actions";

export class UserState {
  readonly loggedIn: boolean = false;
  readonly user: User = null;
  readonly userInfo: Contact = null;
}

export function userReducer(
  state = new UserState(),
  action: UserActions.Actions
): UserState {
  switch (action.type) {
    case UserActionsEnum.USER_SET: {
      return {
        ...state,
        user: action.payload,
        loggedIn: true
      };
    }

    case UserActionsEnum.USER_INFO_SET: {
      return {
        ...state,
        userInfo: action.payload as Contact
      };
    }

    case UserActionsEnum.LOGIN_SET: {
      return {
        ...state,
        loggedIn: action.payload
      };
    }

    default:
      return state;
  }
}
