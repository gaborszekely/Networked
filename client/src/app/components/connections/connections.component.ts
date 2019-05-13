import { Component, OnInit, HostBinding } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition
  // ...
} from "@angular/animations";

import { ContactServiceService } from "src/app/services/contact-service.service";
import { ContactStoreService } from "src/app/services/contact-store.service";
import { Contact } from "src/app/models/Contact";

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
  contacts: any;

  constructor(
    private contactService: ContactServiceService,
    private contactStore: ContactStoreService
  ) {
    this.contacts = this.contactStore.contacts;
  }

  ngOnInit() {}

  deleteContact(contact: Contact) {
    this.contactService.deleteContact(contact._id).subscribe(() => {
      this.contactStore.removeContact(contact._id);
      this.toggleSuccess(
        `Removed ${contact.first_name} from contact list successfully.`
      );
    });
  }

  toggleSuccess(message: string) {
    this.success = !this.success;
    this.successMessage = this.success ? message : "";
  }
}
