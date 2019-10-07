import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import { addEventRequested, addEvent } from "../actions";
import { EventsService } from "../../services";

@Injectable()
export class AddEventEffect {
  addEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addEventRequested.type),
      switchMap(({ event }) =>
        this.eventsService.createEvent(event).pipe(
          map(newEvent => addEvent({ event: newEvent })),
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
