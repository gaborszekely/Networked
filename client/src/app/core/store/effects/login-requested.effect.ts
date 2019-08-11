import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UserActionsEnum, UserLoginRequested, UserLoginError, UserLoginSuccessful } from '../actions/user.actions';
import { of } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { ILoginResponse } from '../../interfaces/LoginResponse';
import { Router } from '@angular/router';

@Injectable()
export class LoginRequestedEffect {
  @Effect()
  loginRequested$ = this.actions$.pipe(
    ofType(UserActionsEnum.USER_LOGIN_REQUESTED),
    switchMap((action: UserLoginRequested) => {
      return this.loginService.loginUser(action.userLoginInfo.username, action.userLoginInfo.password).pipe(
        map((res: ILoginResponse) => {
          this.loginService.setJsonToken(res);
          return new UserLoginSuccessful(res.payload);
        }),
        catchError(() => of(new UserLoginError()))
      )
    }),
  );

  constructor(private actions$: Actions, private loginService: LoginService, private router: Router) {}
}

/*
try {
    const { username, password } = this.form;
    const res: ILoginResponse = await this.loginService.loginUser(
      username,
      password
    );

    if (res.status === 200) {
      this.loginService.setJsonToken(res);
      this.success = true;
      this.store.dispatch(new UserActions.SetLogin(true));
      this.store.dispatch(new UserActions.SetUser(res.payload));
      this.router.navigateByUrl('contacts/list');
    } else {
      this.error = 'Could not log in user. Please try again!';
      this.success = false;
    }
  } catch (err) {
    this.error = 'Could not log in user. Please try again!';
  }
*/