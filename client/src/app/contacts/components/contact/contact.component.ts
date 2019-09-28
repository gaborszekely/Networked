import { Component, OnInit } from "@angular/core";
import { ContactStoreService } from "@core/services/contact-store.service";
import { ActivatedRoute } from "@angular/router";

import { Contact } from "@core/models/Contact";
import { ContactService } from "@core/services/contact.service";
import { Store } from "@ngrx/store";
import { AppState } from "@core/store/app.state";
import { Observable } from "rxjs";
import { Note } from "@core/models/Note";
import * as ContactsActions from "@core/store/actions/contacts.actions";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"]
})
export class ContactComponent implements OnInit {
  contact: Contact;
  imageUrl = "assets/avatar.jpg";
  editFirst = false;
  noteModal = false;
  noteContent: string;
  contacts$: Observable<Contact[]>;

  constructor(
    private contactStore: ContactStoreService,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.contacts$ = store.select("contacts");
  }

  ngOnInit() {
    const userId = this.route.snapshot.params.id;
    this.contacts$.subscribe(
      contacts => {
        const contact = contacts.filter(i => i._id === userId)[0];
        this.contact = contact;
        if (contact) {
          this.contactService.getGithub(contact.github).then(
            user => {
              if (user) {
                this.imageUrl = user.avatar_url;
              }
            },
            () => {
              console.error("Could not fetch Github image");
            }
          );
        }
      },
      () => {
        console.error("Could not fetch contacts from app state");
      }
    );
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

  addNewNote() {
    const note: Note = {
      date: new Date().toString(),
      note: this.noteContent
    };

    this.contactService
      .updateContact(this.contact._id, { notes: [...this.contact.notes, note] })
      .subscribe(newContact => {
        this.store.dispatch(new ContactsActions.UpdateContact(newContact));
        this.noteModal = false;
        this.noteContent = "";
      });
  }

  deleteNote(id: string) {
    this.contactService
      .updateContact(this.contact._id, {
        notes: this.contact.notes.filter(i => i._id !== id)
      })
      .subscribe(contact => {
        this.store.dispatch(new ContactsActions.UpdateContact(contact));
      });
  }
}
