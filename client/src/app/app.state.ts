import { Contact } from "./models/Contact";

export interface AppState {
  readonly contacts: Contact[];
  readonly user: Contact | {};
}
