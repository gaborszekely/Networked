import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { map, mergeMap, switchMap, catchError } from "rxjs/operators";
import { UserService } from "../services/user.service";
import { LOAD_USER_INFO } from "../actions/user.actions";
import * as UserActions from "../actions/user.actions";

@Injectable()
export class UserEffects {
  @Effect()
  loadUserInfo$ = this.actions$.pipe(
    ofType(LOAD_USER_INFO),
    switchMap((action: UserActions.LoadUserInfo) => {
      console.log("ACTION", action);
      return this.userService.getUser(action.payload).pipe(
        map(userInfo => new UserActions.SetUserInfo(userInfo)),
        catchError(() => EMPTY)
      );
    })
  );

  constructor(private actions$: Actions, private userService: UserService) {
    console.log("Effect in motion");
  }
}
