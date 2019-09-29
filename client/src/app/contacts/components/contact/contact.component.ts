import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Contact } from "@core/models/Contact";
import { ContactService } from "@core/services/contact.service";
import { Store } from "@ngrx/store";
import { AppState } from "@core/store/app.state";
import { Observable, combineLatest, of, Subject } from "rxjs";
import { Note } from "@core/models/Note";
import * as ContactsActions from "@app/contacts/store/actions/contacts.actions";
import { getContacts } from "@app/contacts/store/selectors";
import { map, switchMap, takeUntil } from "rxjs/operators";

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
  userId$: Observable<string>;
  destroy$ = new Subject<null>();

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.userId$ = this.route.paramMap.pipe(map(params => params.get("id")));

    this.contact$ = combineLatest(
      this.store.select(getContacts),
      this.userId$
    ).pipe(
      map(([contacts, id]) => contacts.find(contact => contact._id === id)),
      switchMap(contact => {
        if (contact) {
          return this.contactService.getGithub$(contact.github).pipe(
            map(githubInfo => {
              return {
                ...contact,
                imageUrl: githubInfo.avatar_url
              };
            })
          );
        }
        return of(contact);
      })
    );
  }

  ngOnInit() {}

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

    this.contactService
      .updateContact(contact._id, { notes: [...contact.notes, note] })
      .pipe(takeUntil(this.destroy$))
      .subscribe(newContact => {
        this.store.dispatch(new ContactsActions.UpdateContact(newContact));
        this.noteModal = false;
        this.noteContent = "";
      });
  }

  deleteNote(contact: Contact, id: string) {
    this.contactService
      .updateContact(contact._id, {
        notes: contact.notes.filter(i => i._id !== id)
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe(contact => {
        this.store.dispatch(new ContactsActions.UpdateContact(contact));
      });
  }
}
