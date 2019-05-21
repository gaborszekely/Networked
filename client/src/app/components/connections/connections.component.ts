import { Component, OnInit, HostBinding } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";

// import { ContactServiceService } from "src/app/services/contact-service.service";
// import { ContactStoreService } from "src/app/services/contact-store.service";
import { Contact } from "../../models/Contact";
import { Store } from "@ngrx/store";
import { AppState } from "../../app.state";
import { Observable } from "rxjs";
import * as ContactsActions from "../../actions/contacts.actions";

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
  success = false;
  // contacts: any;
  contacts$: Observable<Contact[]>;

  constructor(private store: Store<AppState>) {
    this.contacts$ = store.select("contacts");
  }

  // constructor(
  //   private contactService: ContactServiceService,
  //   private contactStore: ContactStoreService
  // ) {
  //   this.contacts = this.contactStore.contacts;
  // }

  ngOnInit() {
    this.store.dispatch(new ContactsActions.LoadContacts());
  }

  deleteContact(contact: Contact) {
    // this.contactService.deleteContact(contact._id).subscribe(() => {
    //   this.contactStore.removeContact(contact._id);
    //   this.toggleSuccess(
    //     `Removed ${contact.first_name} from contact list successfully.`
    //   );
    // });
    this.store.dispatch(new ContactsActions.DeleteContact(contact._id));
  }

  toggleSuccess(message: string) {
    this.success = !this.success;
    this.successMessage = this.success ? message : "";
  }

  isEmpty() {
    return this.contacts$.subscribe(contacts => {
      return contacts.length === 0;
    });
  }
}
