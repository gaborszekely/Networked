import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/services/login.service";
import { ILoginResponse } from "src/app/interfaces/LoginResponse";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app/app.state";
import * as UserActions from "../../actions/user.actions";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  form = {
    username: "",
    password: ""
  };
  submitted = false;
  error = "";
  success = null;

  constructor(
    private readonly loginService: LoginService,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit() {}

  async onSubmit() {
    try {
      const { username, password } = this.form;
      const res: ILoginResponse = await this.loginService.loginUser(
        username,
        password
      );
      console.log(res.payload);

      if (res.status === 200) {
        this.loginService.setJsonToken(res);
        this.success = true;
        this.store.dispatch(new UserActions.SetLogin(true));
        this.store.dispatch(new UserActions.SetUser(res.payload));
      } else {
        this.error = "Could not log in user. Please try again!";
        this.success = false;
      }
    } catch (err) {
      this.error = "Could not log in user. Please try again!";
    }
  }
}
