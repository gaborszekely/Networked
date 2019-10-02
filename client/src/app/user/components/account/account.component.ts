import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "@core/models/User";
import { Store } from "@ngrx/store";
import { AppState } from "../../../core/store/app.state";
import { Contact } from "@core/models/Contact";
import { ContactService } from "@core/services/contact.service";
import * as UserActions from "@core/store/actions/user.actions";
import { UserService } from "@core/services/user.service";
import { getUser } from "@core/store/selectors/user.selectors";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"]
})
export class AccountComponent implements OnInit {
  user$: Observable<any>;
  userInfo: any;

  constructor(
    private readonly store: Store<AppState>,
    private userService: UserService
  ) {
    this.user$ = store.select(getUser);
  }

  ngOnInit() {
    this.user$.subscribe(res => {
      if (!res.loggedIn) {
        const { access_token, loggedIn } = this.userService.getFromStorage();
      }

      const { id } = res.user;

      if (!Object.keys(res.userInfo).length) {
        this.store.dispatch(new UserActions.UserInfoLoaded(id));
      } else {
        this.userInfo = res.userInfo;
      }
    });
  }
}
