import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "@core/store/app.state";
import { Observable, of, combineLatest } from "rxjs";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { map } from "rxjs/operators";
import { getLoggedInStatus } from "@core/store/selectors";
import { LoginService } from "./login.service";

@Injectable()
export class AuthRouteGuard implements CanActivate {
  isLoggedIn$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private loginService: LoginService,
    private router: Router
  ) {
    this.isLoggedIn$ = this.store.select(getLoggedInStatus);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.isLoggedIn$.pipe(
      map(loggedIn => {
        if (loggedIn && this.loginService.loginTokenNotExpired()) {
          return true;
        }

        return this.router.parseUrl("/login?redirect=true");
      })
    );
  }
}
