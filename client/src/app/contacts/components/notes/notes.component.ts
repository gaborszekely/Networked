import { Component, OnInit } from "@angular/core";
import { UserNote } from "@core/models/UserNote";
import { ContactService } from "@core/services/contact.service";
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
  notesByUser: UserNote[];
  contacts$: Observable<Contact[]>;

  constructor(
    private contactService: ContactService,
    private store: Store<AppState>
  ) {
    this.contacts$ = this.store.select(getContacts);
  }

  ngOnInit() {
    console.log("App on init");

    this.store.dispatch(new ContactsRequested());

    this.contacts$.subscribe(contacts => {
      this.notesByUser = contacts.reduce((acc, contact) => {
        contact.notes.forEach(note => {
          acc.push({ user: contact, note });
        });
        return acc;
      }, []);
    });
  }
}
