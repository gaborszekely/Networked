import { Contact } from "@core/models/Contact";

export class ContactsState {
  readonly contacts: Contact[] = [];
  readonly contactsLoaded: boolean = false;
}
