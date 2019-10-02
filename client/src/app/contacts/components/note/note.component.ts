import { Component, OnInit, Input } from "@angular/core";
import { UserNote } from "@core/models/UserNote";
import { Store } from "@ngrx/store";
import { AppState } from "@core/store/app.state";
import { DeleteNoteRequested } from "@app/contacts/store/actions/contacts.actions";

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html",
  styleUrls: ["./note.component.scss"]
})
export class NoteComponent implements OnInit {
  @Input() userNote: UserNote;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  deleteNote() {
    const { user, note } = this.userNote;
    this.store.dispatch(new DeleteNoteRequested(user, note._id));
  }
}
