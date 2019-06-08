import { Component, OnInit } from "@angular/core";
import { fadeAnimation } from "../../../../core/animations/fade-animation";
import { Observable } from "rxjs";
import { Contact } from "src/app/core/models/Contact";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import * as ContactsActions from "../../../../actions/contacts.actions";

@Component({
  selector: "app-content-area",
  templateUrl: "./content-area.component.html",
  styleUrls: ["./content-area.component.scss"],
  animations: [fadeAnimation]
})
export class ContentAreaComponent implements OnInit {
  contacts$: Observable<Contact[]>;

  constructor(private store: Store<AppState>) {
    this.contacts$ = store.select("contacts");
  }

  ngOnInit() {
    this.contacts$.subscribe(contacts => {
      if (contacts.length === 0) {
        this.store.dispatch(new ContactsActions.LoadContacts());
      }
    });
  }
}
