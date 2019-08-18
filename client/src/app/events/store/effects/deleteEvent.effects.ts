import { Injectable } from "@angular/core";
import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { NEVER } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import * as EventsActions from "../actions";
import { EventsService } from "../../services";

@Injectable()
export class DeleteEventEffect {
  @Effect()
  deleteEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventsActions.deleteEventAPI.type),
      switchMap(({ _id }) => {
        return this.eventsService.deleteEvent(_id).pipe(
          map(event => EventsActions.deleteEvent({ _id: event._id })),
          catchError(() => NEVER)
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private eventsService: EventsService
  ) {}
}
