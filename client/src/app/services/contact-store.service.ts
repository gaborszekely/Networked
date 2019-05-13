import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Contact } from "../models/Contact";

@Injectable({
  providedIn: "root"
})
export class ContactStoreService {
  private readonly _contacts = new BehaviorSubject<Contact[]>([]);
  readonly contacts$ = this._contacts.asObservable();

  get contacts(): Contact[] {
    return this._contacts.getValue();
  }

  set contacts(val: Contact[]) {
    this._contacts.next(val);
  }

  getContact() {}

  addContacts(contacts: Contact[]) {
    this.contacts = [...contacts];
  }

  addContact(contact: Contact) {
    this.contacts = [...this.contacts, contact];
  }

  updateContact(contact: Contact) {
    this.contacts = this.contacts.map(i =>
      i._id === contact._id ? contact : i
    );
  }

  removeContact(id: string) {
    this.contacts = this.contacts.filter(i => i._id !== id);
  }

  isEmpty() {
    return this.contacts.length === 0;
  }
}
