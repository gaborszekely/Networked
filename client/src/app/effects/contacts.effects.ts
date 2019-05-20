import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";
import { ContactServiceService } from "../services/contact-service.service";
import { LOAD_CONTACTS, ADD_CONTACT } from "../actions/contacts.actions";
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
    private contactService: ContactServiceService
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
