import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { ContactService } from "@core/services/contact.service";
import {
  ContactsActionsEnum,
  AddNoteRequested,
  UpdateContact
} from "../../actions";
import { map, catchError, concatMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class AddNoteEffect {
  addNote$ = this.actions$.pipe(
    ofType<AddNoteRequested>(ContactsActionsEnum.ADD_NOTE_REQUESTED),
    concatMap(action => {
      return this.contactService
        .updateContact(action.contact._id, {
          notes: [...action.contact.notes, action.note]
        })
        .pipe(
          map(contact => new UpdateContact(contact)),
          catchError(() => of(null))
        );
    })
  );

  constructor(
    private actions$: Actions,
    private contactService: ContactService
  ) {}
}
