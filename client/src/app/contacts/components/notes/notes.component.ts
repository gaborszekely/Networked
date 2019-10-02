import { Component, OnInit } from "@angular/core";
import { UserNote } from "@core/models/UserNote";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Contact } from "@core/models/Contact";
import { getContacts } from "@app/contacts/store/selectors";
import { ContactsRequested } from "@app/contacts/store/actions";
import { map } from "rxjs/operators";
import { ContactsState } from "@app/contacts/store/contacts.state";
import { fadeInOut } from "@core/animations/fade-in-out";

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.scss"],
  animations: [fadeInOut]
})
export class NotesComponent implements OnInit {
  notesByUser$: Observable<UserNote[]>;
  contacts$: Observable<Contact[]>;

  constructor(private store: Store<ContactsState>) {
    this.contacts$ = this.store.select(getContacts);

    this.notesByUser$ = this.contacts$.pipe(
      map(contacts => {
        return contacts.reduce((acc, contact) => {
          return [
            ...acc,
            ...contact.notes.map(note => ({ user: contact, note }))
          ];
        }, []);
      })
    );
  }

  ngOnInit() {
    this.store.dispatch(new ContactsRequested());
  }
}
