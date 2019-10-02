import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { forkJoin, of } from "rxjs";
import {
  map,
  catchError,
  switchMap,
  withLatestFrom,
  filter
} from "rxjs/operators";
import { ContactService } from "@core/services/contact.service";
import {
  ContactsActionsEnum,
  ContactsLoadError,
  ContactsLoaded
} from "../actions/contacts.actions";
import { ContactsState } from "../contacts.state";
import { Store } from "@ngrx/store";
import { getContactsLoaded } from "../selectors";

@Injectable()
export class LoadContactsEffect {
  @Effect()
  loadContacts$ = this.actions$.pipe(
    ofType(ContactsActionsEnum.CONTACTS_REQUESTED),
    withLatestFrom(this.store.select(getContactsLoaded)),
    filter(([, loaded]) => !loaded),
    switchMap(() =>
      this.contactService.getContacts().pipe(
        switchMap(contacts =>
          forkJoin(
            contacts.map(contact =>
              this.contactService.getGithub$(contact.github).pipe(
                map(gitHubInfo => ({
                  ...contact,
                  imageUrl: gitHubInfo.avatar_url
                }))
              )
            )
          ).pipe(map(contacts => new ContactsLoaded(contacts)))
        ),

        catchError(() => of(new ContactsLoadError()))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private contactService: ContactService,
    private store: Store<ContactsState>
  ) {}
}
