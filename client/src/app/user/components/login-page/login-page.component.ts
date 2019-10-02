import { Component, OnInit, OnDestroy } from "@angular/core";
import { LoginService } from "@core/services/login.service";
import { ILoginResponse } from "@core/interfaces/LoginResponse";
import { Store } from "@ngrx/store";
import { AppState } from "@core/store/app.state";
import * as UserActions from "@core/store/actions/user.actions";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit, OnDestroy {
  loginSubscription: Subscription;
  isRedirect$: Observable<boolean>;

  form = {
    username: "",
    password: ""
  };
  submitted = false;
  error = "";
  success = null;

  constructor(
    private loginService: LoginService,
    private readonly store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isRedirect$ = this.activatedRoute.queryParamMap.pipe(
      map(params => params.get("redirect") === "true")
    );
  }

  async login() {
    const { username, password } = this.form;

    this.loginSubscription = this.loginService
      .loginUser(username, password)
      .subscribe(
        res => {
          if (res.status === 200) {
            this.loginService.setJsonToken(res);
            this.success = true;
            this.store.dispatch(new UserActions.UserSet(res.payload));
            this.router.navigateByUrl("contacts/list");
          } else {
            this.error = "Could not log in user. Please try again!";
            this.success = false;
          }
        },
        err => {
          console.error(err);
          this.error = "Could not log in user. Please try again!";
          this.success = false;
        }
      );
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
}
