import { Component, OnInit, Input } from "@angular/core";
import { UserNote } from "src/app/core/models/UserNote";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../app.state";
import * as ContactsActions from "../../../../actions/contacts.actions";
import { ContactService } from "src/app/core/services/contact.service";

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.scss"]
})
export class NoteComponent implements OnInit {
  @Input() userNote: UserNote;

  constructor(
    private readonly store: Store<AppState>,
    private contactService: ContactService
  ) {}

  ngOnInit() {}

  deleteNote() {
    this.contactService
      .updateContact(this.userNote.user._id, {
        notes: this.userNote.user.notes.filter(
          i => i._id !== this.userNote.note._id
        )
      })
      .subscribe(contact => {
        this.store.dispatch(new ContactsActions.UpdateContact(contact));
      });
  }
}
