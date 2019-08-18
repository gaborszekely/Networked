import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { UserService } from "../../services/user.service";
import * as UserActions from "../actions/user.actions";

@Injectable()
export class UserEffects {
  @Effect()
  loadUserInfo$ = this.actions$.pipe(
    ofType(UserActions.UserActionsEnum.USER_INFO_LOADED),
    switchMap((action: UserActions.UserInfoLoaded) => {
      return this.userService.getUser(action.payload).pipe(
        map(userInfo => new UserActions.UserInfoSet(userInfo)),
        catchError(() => EMPTY)
      );
    })
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
