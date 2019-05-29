import { Contact } from "./core/models/Contact";

export interface AppState {
  readonly contacts: Contact[];
  readonly user: Contact | {};
}
