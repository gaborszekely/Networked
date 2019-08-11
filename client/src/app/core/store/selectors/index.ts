import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { UserState } from '../core.state';

export const userState = (state: AppState): UserState => state.user;

export const userLoginErrorSelector = createSelector(
  userState,
  state => state.error
);

export const userSelector = createSelector(
  userState,
  state => state.user
);

export const isLoggedInSelector = createSelector(
  userState,
  state => state.loggedIn
)

export const isLoadingSelector = createSelector(
  userState,
  state => state.loading
);