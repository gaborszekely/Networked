import { Injectable } from "@angular/core";
import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { map, switchMap, catchError } from "rxjs/operators";
import * as EventsActions from "../actions";
import { EventsService } from "../../services";

@Injectable()
export class LoadEventsEffect {
  @Effect()
  loadEvents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EventsActions.fetchEvents.type),
      switchMap(() => {
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
