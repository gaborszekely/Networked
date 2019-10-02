import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Contact } from "@core/models/Contact";
import { Router } from "@angular/router";

@Component({
  selector: "app-connection",
  templateUrl: "./connection.component.html",
  styleUrls: ["./connection.component.scss"]
})
export class ConnectionComponent implements OnInit {
  @Input() contact: Contact;
  @Output() deleteContact: EventEmitter<Contact> = new EventEmitter();

  defaultImageUrl = "assets/avatar.jpg";

  constructor(private router: Router) {}

  ngOnInit() {}

  onDelete(contact: Contact) {
    this.deleteContact.emit(contact);
  }

  goToProfile() {
    this.router.navigate(["/contacts/list", this.contact.github]);
  }
}
