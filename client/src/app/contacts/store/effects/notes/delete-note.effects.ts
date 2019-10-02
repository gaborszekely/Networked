import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, catchError, concatMap } from "rxjs/operators";
import { ContactService } from "@core/services/contact.service";
import {
  ContactsActionsEnum,
  UpdateContact,
  ContactsActions,
  DeleteNoteError
} from "../../actions/contacts.actions";

@Injectable()
export class DeleteNoteEffect {
  @Effect()
  deleteNote$ = this.actions$.pipe(
    ofType(ContactsActionsEnum.DELETE_NOTE_REQUESTED),
    concatMap(action => {
      return this.contactService
        .updateContact(action.contact._id, {
          notes: action.contact.notes.filter(note => note._id !== action.noteId)
        })
        .pipe(
          map(contact => new UpdateContact(contact)),
          // TODO - Add error handling
          catchError(() => of(new DeleteNoteError()))
        );
    })
  );

  constructor(
    private actions$: Actions<ContactsActions>,
    private contactService: ContactService
  ) {}
}
