import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { UserService } from '../core/services/user.service';
import { LOAD_USER_INFO } from '../actions/user.actions';
import { LoadUserInfo, SetUserInfo } from '../actions/user.actions';

@Injectable()
export class UserEffects {
  @Effect()
  loadUserInfo$ = this.actions$.pipe(
    ofType(LOAD_USER_INFO),
    switchMap((action: LoadUserInfo) => {
      return this.userService.getUser(action.payload).pipe(
        map(userInfo => new SetUserInfo(userInfo)),
        catchError(() => EMPTY)
      );
    })
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
