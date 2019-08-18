import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { ContactService } from "../../services/contact.service";
import { LOAD_CONTACTS } from "../actions/contacts.actions";
import * as ContactsActions from "../actions/contacts.actions";

@Injectable()
export class ContactsEffects {
  @Effect()
  loadContacts$ = this.actions$.pipe(
    ofType(LOAD_CONTACTS),
    switchMap(() =>
      this.contactService.getContacts().pipe(
        map(contacts => new ContactsActions.SetContacts(contacts)),
        catchError(() => EMPTY)
      )
    )
  );

  constructor(
    private actions$: Actions,
    private contactService: ContactService
  ) {}
}
