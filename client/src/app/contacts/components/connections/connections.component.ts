import { Component, OnInit } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";
import { Contact } from "../../../core/models/Contact";
import { Store } from "@ngrx/store";
import { AppState } from "@core/store/app.state";
import { Observable } from "rxjs";
import * as ContactsActions from "../../store/actions/contacts.actions";
import { getContacts, getContactsLoaded } from "@app/contacts/store/selectors";

@Component({
  selector: "app-connections",
  templateUrl: "./connections.component.html",
  styleUrls: ["./connections.component.scss"],
  animations: [
    trigger("fadeInOut", [
      state(
        "void",
        style({
          opacity: 0
        })
      ),
      transition("void <=> *", animate(200))
    ])
  ]
})
export class ConnectionsComponent implements OnInit {
  successMessage: string;
  success = false;
  contacts$: Observable<Contact[]>;
  contactsLoaded$: Observable<boolean>;
  contacts: number = 0;
  length = 0;

  constructor(private store: Store<AppState>) {
    this.contacts$ = this.store.select(getContacts);
    this.contactsLoaded$ = this.store.select(getContactsLoaded);
  }

  ngOnInit() {
    this.contactsLoaded$.subscribe(loaded => {
      if (!loaded) {
        this.store.dispatch(new ContactsActions.ContactsRequested());
      }
    });
  }

  deleteContact(contact: Contact) {
    this.store.dispatch(new ContactsActions.DeleteContact(contact._id));
  }

  toggleSuccess(message: string) {
    this.success = !this.success;
    this.successMessage = this.success ? message : "";
  }

  isEmpty() {
    return this.length === 0;
  }
}
