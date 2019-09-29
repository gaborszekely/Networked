import { Injectable } from "@angular/core";
import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import * as EventsActions from "../actions";
import { EventsService } from "../../services";

@Injectable()
export class AddEventEffect {
  @Effect()
  addEvent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventsActions.addEventAPI.type),
      switchMap(({ event }) => {
        return this.eventsService.createEvent(event).pipe(
          map(newEvent => EventsActions.addEvent({ event: newEvent })),
          catchError(() => EMPTY)
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private eventsService: EventsService
  ) {}
}
