import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { UserLoginRequested } from 'src/app/core/store/actions/user.actions';
import { UserLoginInfo } from 'src/app/core/interfaces/UserLoginInfo';
import { userLoginErrorSelector } from 'src/app/core/store/selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginError$: Observable<boolean>;
  
  form: UserLoginInfo = {
    username: '',
    password: '',
  };
  submitted = false;
  error = '';
  success = null;

  constructor(private readonly store: Store<AppState>) {
    this.loginError$ = this.store.select(userLoginErrorSelector);
  }

  ngOnInit() {}

  login() {
    this.store.dispatch(new UserLoginRequested(this.form));
  }
}
