import { Injectable } from "@angular/core";
import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { map, mergeMap, switchMap, catchError, take } from "rxjs/operators";
import * as EventsActions from "./events.actions";
import { EventsService } from "../services/events.service";

@Injectable()
export class EventsEffects {
  @Effect()
  loadEvents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventsActions.fetchEvents.type),
      switchMap(() => {
        console.log("I have been triggered");
        return this.eventsService.loadEvents().pipe(
          map(events => EventsActions.loadEvents({ events })),
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
