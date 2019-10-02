import { Injectable } from "@angular/core";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { ContactService } from "@core/services/contact.service";
import {
  ContactsActionsEnum,
  AddNoteRequested,
  UpdateContact,
  ContactsActions,
  AddNoteError
} from "../../actions";
import { of, EMPTY } from "rxjs";
import { map, catchError, concatMap, tap } from "rxjs/operators";

@Injectable()
export class AddNoteEffect {
  @Effect()
  addNote$ = this.actions$.pipe(
    ofType(ContactsActionsEnum.ADD_NOTE_REQUESTED),
    concatMap((action: AddNoteRequested) => {
      return this.contactService
        .updateContact(action.contact._id, {
          notes: [...action.contact.notes, action.note]
        })
        .pipe(
          map(contact => new UpdateContact(contact)),
          catchError(() => of(new AddNoteError()))
        );
    })
  );

  constructor(
    private actions$: Actions<ContactsActions>,
    private contactService: ContactService
  ) {
    this.actions$.subscribe(x => console.log(x));
  }
}
