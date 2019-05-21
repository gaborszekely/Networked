import { Component, OnInit } from "@angular/core";
import { ContactStoreService } from "src/app/services/contact-store.service";
import { ActivatedRoute } from "@angular/router";

import { Contact } from "src/app/models/Contact";
import { ContactServiceService } from "src/app/services/contact-service.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../../app/app.state";
import { Observable } from "rxjs";

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
    private contactService: ContactServiceService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.contacts$ = store.select("contacts");
  }

  ngOnInit() {
    const userId = this.route.snapshot.params.id;
    // this.contactStore.contacts$.subscribe(
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
            err => {
              console.error("Could not fetch Github image");
            }
          );
        }
      },
      err => {
        console.error("Could not fetch contacts from app state");
      }
    );
  }

  toggleField(field: string) {
    console.log("Editiing " + field);
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
    const newNoteBody = [
      ...this.contact.notes,
      { date: new Date(), note: this.noteContent }
    ];

    console.log(newNoteBody);

    this.contactService
      .updateContact(this.contact._id, { notes: newNoteBody })
      .subscribe(newContact => {
        this.contactStore.updateContact(newContact);
        this.noteModal = false;
        this.noteContent = "";
      });
  }

  deleteNote(id: string) {
    this.contactService
      .updateContact(this.contact._id, {
        notes: this.contact.notes.filter(i => i._id !== id)
      })
      .subscribe(newContact => {
        this.contactStore.updateContact(newContact);
      });
  }
}
