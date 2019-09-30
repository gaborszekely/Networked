import { Component, OnInit } from "@angular/core";
import { UserNote } from "@core/models/UserNote";
import { Store } from "@ngrx/store";
import { AppState } from "@core/store/app.state";
import { Observable } from "rxjs";
import { Contact } from "@core/models/Contact";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { getContacts } from "@app/contacts/store/selectors";
import { ContactsRequested } from "@app/contacts/store/actions";
import { map } from "rxjs/operators";

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.scss"],
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
export class NotesComponent implements OnInit {
  notesByUser$: Observable<UserNote[]>;
  contacts$: Observable<Contact[]>;

  constructor(private store: Store<AppState>) {
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
