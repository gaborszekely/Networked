import { LoadContactsEffect } from "./load-contacts.effects";
import { AddContactEffect } from "./add-contact.effects";
import { NoteEffects } from "./notes";

export const ContactsEffects = [
  ...NoteEffects,
  LoadContactsEffect,
  AddContactEffect
];
