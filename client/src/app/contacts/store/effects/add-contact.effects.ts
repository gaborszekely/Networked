import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, catchError, switchMap } from "rxjs/operators";
import { ContactService } from "@core/services/contact.service";
import {
  ContactsActionsEnum,
  ContactAdded,
  ContactAddedError
} from "../actions/contacts.actions";

@Injectable()
export class AddContactEffect {
  @Effect()
  addContact$ = this.actions$.pipe(
    ofType(ContactsActionsEnum.ADD_CONTACT_REQUESTED),
    switchMap(contact => {
      alert("ha");
      return this.contactService.addContact(contact).pipe(
        map(contact => new ContactAdded(contact))
        // catchError(() => of(new ContactAddedError()))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private contactService: ContactService
  ) {}
}
