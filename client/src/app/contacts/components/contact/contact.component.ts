import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Contact } from "@core/models/Contact";
import { Store } from "@ngrx/store";
import { AppState } from "@core/store/app.state";
import { Observable, combineLatest, of, Subject } from "rxjs";
import { Note } from "@core/models/Note";
import { getContacts } from "@app/contacts/store/selectors";
import { map } from "rxjs/operators";
import {
  ContactsRequested,
  DeleteNoteRequested,
  AddNoteRequested
} from "@app/contacts/store/actions/contacts.actions";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"]
})
export class ContactComponent implements OnInit, OnDestroy {
  contact: Contact;
  defaultImageUrl = "assets/avatar.jpg";
  editFirst = false;
  noteModal = false;
  noteContent: string;
  contact$: Observable<Contact>;
  userGithub$: Observable<string>;
  destroy$ = new Subject<null>();

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.userGithub$ = this.route.paramMap.pipe(
      map(params => params.get("github"))
    );

    this.contact$ = combineLatest(
      this.store.select(getContacts),
      this.userGithub$
    ).pipe(
      map(([contacts, github]) =>
        contacts.find(contact => contact.github === github)
      )
    );
  }

  ngOnInit() {
    this.store.dispatch(new ContactsRequested());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleField(field: string) {
    switch (field) {
      case "first_name":
        this.editFirst = !this.editFirst;
      default:
        return;
    }
  }

  toggleNoteModal() {
    this.noteModal = !this.noteModal;
  }

  addNewNote(contact: Contact) {
    const note: Note = {
      date: new Date().toString(),
      note: this.noteContent
    };

    this.store.dispatch(new AddNoteRequested(contact, note));

    this.noteModal = false;
    this.noteContent = "";

    // this.contactService
    //   .updateContact(contact._id, { notes: [...contact.notes, note] })
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe(newContact => {
    //     this.store.dispatch(new UpdateContact(newContact));
    //     this.noteModal = false;
    //     this.noteContent = "";
    //   });
  }

  deleteNote(contact: Contact, id: string) {
    this.store.dispatch(new DeleteNoteRequested(contact, id));
  }
}
