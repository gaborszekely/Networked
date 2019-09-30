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
import { Observable, from, forkJoin, of } from "rxjs";
import * as ContactsActions from "../../store/actions/contacts.actions";
import {
  getContacts,
  getContactsLoaded,
  getContactsLoadError,
  getContactsLoading
} from "@app/contacts/store/selectors";
import { map, switchMap } from "rxjs/operators";
import { combineLatest } from "rxjs";
import { ContactService } from "@core/services/contact.service";

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
  success = true;
  contacts$: Observable<Contact[]>;
  contactsLoaded$: Observable<boolean>;
  contactsLoading$: Observable<boolean>;
  contactsLoadError$: Observable<boolean>;
  noContacts$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private contactService: ContactService
  ) {
    this.contacts$ = this.store.select(getContacts);
    this.contactsLoaded$ = this.store.select(getContactsLoaded);
    this.contactsLoading$ = this.store.select(getContactsLoading);
    this.contactsLoadError$ = this.store.select(getContactsLoadError);
    this.noContacts$ = combineLatest(this.contacts$, this.contactsLoaded$).pipe(
      map(([contacts, loaded]) => loaded && !contacts.length)
    );
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
}
