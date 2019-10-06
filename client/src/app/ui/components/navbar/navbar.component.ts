import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "@core/store/app.state";
import { Observable } from "rxjs";
import { getUser, getLoggedInStatus } from "@core/store/selectors";
import { User } from "@core/models/User";
import { ClearContacts } from "@app/contacts/store/actions/contacts.actions";
import { LoginSet } from "@core/store/actions/user.actions";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  confirmed = false;
  user$: Observable<User>;
  loggedIn$: Observable<boolean>;

  constructor(private router: Router, public store: Store<AppState>) {
    this.user$ = store.select(getUser);
    this.loggedIn$ = store.select(getLoggedInStatus);
  }

  confirm(): void {
    this.confirmed = true;
  }

  logout(): void {
    this.cleanLogoutState();
    this.router.navigateByUrl("login");
  }

  cleanLogoutState(): void {
    localStorage.clear();
    this.store.dispatch(new ClearContacts());
    this.store.dispatch(new LoginSet(false));
  }
}
