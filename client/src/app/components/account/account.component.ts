import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../core/models/User";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app/app.state";
import { Contact } from "src/app/core/models/Contact";
import { ContactService } from "src/app/core/services/contact.service";
import * as UserActions from "../../actions/user.actions";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"]
})
export class AccountComponent implements OnInit {
  user$: Observable<any>;
  userInfo: any;

  constructor(private readonly store: Store<AppState>) {
    this.user$ = store.select("user");
  }

  ngOnInit() {
    this.user$.subscribe(res => {
      const { id } = res.user;
      console.log(res.userInfo);
      if (!res.userInfo.first_name) {
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
