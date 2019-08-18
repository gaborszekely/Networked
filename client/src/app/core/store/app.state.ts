import { ActionReducerMap } from "@ngrx/store";
import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { userReducer, UserState } from "./reducers/user.reducer";

export class AppState {
  readonly router: RouterReducerState<any>;
  readonly user: UserState = new UserState();
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  user: userReducer
};
