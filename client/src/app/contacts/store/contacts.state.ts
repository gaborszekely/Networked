import { Contact } from "@core/models/Contact";

export class ContactsState {
  readonly contacts: Contact[] = [];

  readonly contactsLoading: boolean = false;
  readonly contactsLoaded: boolean = false;
  readonly contactsLoadError: boolean = false;

  readonly contactAdded: boolean = false;
  readonly contactAddedError: boolean = false;
  readonly contactAddedLoading: boolean = false;
  readonly contactAddedLoaded: boolean = false;
}
