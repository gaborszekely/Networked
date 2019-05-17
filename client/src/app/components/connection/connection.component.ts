import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { Contact } from "src/app/models/Contact";
import { ContactServiceService } from "src/app/services/contact-service.service";
import { ContactStoreService } from "src/app/services/contact-store.service";

@Component({
  selector: "app-connection",
  templateUrl: "./connection.component.html",
  styleUrls: ["./connection.component.scss"]
})
export class ConnectionComponent implements OnInit {
  @Input() contact: Contact;
  @Output() deleteContact: EventEmitter<Contact> = new EventEmitter();

  imageUrl: string;
  defaultAvatarUrl = "assets/avatar.jpg";

  constructor(
    private contactService: ContactServiceService,
    private contactStore: ContactStoreService
  ) {}

  ngOnInit() {
    this.contactService.getGithub(this.contact.github).then(
      user => {
        this.imageUrl =
          user && user.avatar_url ? user.avatar_url : this.defaultAvatarUrl;
      },
      err => {
        this.imageUrl = this.defaultAvatarUrl;
      }
    );
  }

  onDelete(contact: Contact) {
    this.deleteContact.emit(contact);
  }
}