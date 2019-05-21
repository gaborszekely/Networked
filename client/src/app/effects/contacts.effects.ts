import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
import { ContactService } from "../services/contact.service";
import { LOAD_CONTACTS } from "../actions/contacts.actions";
import * as ContactsActions from "../actions/contacts.actions";

@Injectable()
export class ContactsEffects {
  @Effect()
  loadContacts$ = this.actions$.pipe(
    ofType(LOAD_CONTACTS),
    mergeMap(() =>
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

/*
switchMap(() => {
  return this.http.get<string>('login')
    .pipe(
      map((userName) => {
        return new authActions.SetAuths(userName);
      })
    )
})
*/
