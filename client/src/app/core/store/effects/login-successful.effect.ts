import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { UserActionsEnum } from '../actions/user.actions';
import { Router } from '@angular/router';

@Injectable()
export class LoginSuccessfulEffect {
  @Effect({ dispatch: false })
  loginSuccessful$ = this.actions$.pipe(
    ofType(UserActionsEnum.USER_LOGIN_SUCCESSFUL),
    tap(() => {
      this.router.navigateByUrl('contacts/list');
    })
  );

  constructor(private actions$: Actions, private router: Router) {}
}