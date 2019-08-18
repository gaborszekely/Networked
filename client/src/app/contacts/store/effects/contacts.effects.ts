import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { map, catchError, switchMap } from "rxjs/operators";
import { ContactService } from "@core/services/contact.service";
import * as ContactsActions from "../actions/contacts.actions";
import { ContactsActionsEnum } from "../actions/contacts.actions";

@Injectable()
export class ContactsEffects {
  @Effect()
  loadContacts$ = this.actions$.pipe(
    ofType(ContactsActionsEnum.CONTACTS_REQUESTED),
    switchMap(() =>
      this.contactService.getContacts().pipe(
        map(contacts => {
          return new ContactsActions.SetContacts(contacts);
        }),
        catchError(() => EMPTY)
      )
    )
  );

  constructor(
    private actions$: Actions,
    private contactService: ContactService
  ) {}
}
