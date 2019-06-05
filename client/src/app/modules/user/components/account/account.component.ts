import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../../../core/models/User";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app.state";
import { Contact } from "src/app/core/models/Contact";
import { ContactService } from "src/app/core/services/contact.service";
import * as UserActions from "../../../../actions/user.actions";
import { UserService } from "src/app/core/services/user.service";

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
    this.user$ = store.select("user");
  }

  ngOnInit() {
    this.user$.subscribe(res => {
      if (!res.loggedIn) {
        const { access_token, loggedIn } = this.userService.getFromStorage();
        console.log(access_token);
      }

      const { id } = res.user;
      console.log(res);
      if (!Object.keys(res.userInfo).length) {
        console.log("Dispatching...");
        this.store.dispatch(new UserActions.LoadUserInfo(id));
      } else {
        console.log("Dispatched");
        this.userInfo = res.userInfo;
        console.log(this.userInfo);
      }
    });
  }
}
