import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { UserState } from "../reducers/user.reducer";

export const getUserStore = (state: AppState): UserState => state.user;

export const getUser = createSelector(
  getUserStore,
  state => state.user
);

export const getUserInfo = createSelector(
  getUserStore,
  state => state.userInfo
);

export const getLoggedInStatus = createSelector(
  getUserStore,
  state => state.loggedIn
);
