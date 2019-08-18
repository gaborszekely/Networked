import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { Contact } from "src/app/core/models/Contact";
import { ContactService } from "src/app/core/services/contact.service";

@Component({
  selector: "app-connection",
  templateUrl: "./connection.component.html",
  styleUrls: ["./connection.component.scss"]
})
export class ConnectionComponent implements OnInit {
  @Input() contact: Contact;
  @Output() deleteContact: EventEmitter<Contact> = new EventEmitter();

  imageUrl = "assets/avatar.jpg";

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getGithub(this.contact.github).then(user => {
      if (user && user.avatar_url) {
        this.imageUrl = user.avatar_url;
      }
    });
  }

  onDelete(contact: Contact) {
    this.deleteContact.emit(contact);
  }
}
