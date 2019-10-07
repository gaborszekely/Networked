import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { map, exhaustMap, catchError } from "rxjs/operators";
import * as EventsActions from "../actions";
import { EventsService } from "../../services";

@Injectable()
export class DeleteEventEffect {
  deleteEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.deleteEventAPI.type),
      exhaustMap(({ _id }) =>
        this.eventsService.deleteEvent(_id).pipe(
          map(event => EventsActions.deleteEvent({ _id: event._id })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private eventsService: EventsService
  ) {}
}
