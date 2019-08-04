import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/services/login.service';
import { ILoginResponse } from 'src/app/core/interfaces/LoginResponse';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as UserActions from 'src/app/actions/user.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form = {
    username: '',
    password: ''
  };
  submitted = false;
  error = '';
  success = null;

  constructor(
    private loginService: LoginService,
    private readonly store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit() {}

  async login() {
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
  }
}
