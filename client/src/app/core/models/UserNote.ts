import { Contact } from "./Contact";
import { Note } from "./Note";

export interface UserNote {
  user: Contact;
  note: Note;
}
