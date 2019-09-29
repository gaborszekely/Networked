import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { from, forkJoin, of } from "rxjs";
import {
  map,
  catchError,
  switchMap,
  concatMap,
  flatMap,
  takeWhile,
  toArray
} from "rxjs/operators";
import { ContactService } from "@core/services/contact.service";
import {
  ContactsActionsEnum,
  ContactsLoadError,
  ContactsLoaded
} from "../actions/contacts.actions";

@Injectable()
export class LoadContactsEffect {
  @Effect()
  loadContacts$ = this.actions$.pipe(
    ofType(ContactsActionsEnum.CONTACTS_REQUESTED),
    switchMap(() =>
      this.contactService.getContacts().pipe(
        flatMap(contacts => {
          return of(contacts).pipe(
            // emit each array value as observable
            concatMap(contacts => from(contacts)),
            // emit an array containing the contact and the corresponding githubInfo
            concatMap(contact =>
              forkJoin(
                of(contact),
                this.contactService.getGithub$(contact.github)
              )
            ),
            // take the returned array and convert it to an Object
            map(([contact, githubInfo]) => ({
              ...contact,
              imageUrl: githubInfo.avatar_url
            })),
            takeWhile((val, index) => index < contacts.length),
            // concatenate everything into a final Array
            toArray(),
            map(contacts => {
              return new ContactsLoaded(contacts);
            })
          );
        }),
        catchError(() => of(new ContactsLoadError()))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private contactService: ContactService
  ) {}
}
