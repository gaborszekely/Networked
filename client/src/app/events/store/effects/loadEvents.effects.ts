import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { EMPTY } from "rxjs";
import { map, exhaustMap, catchError } from "rxjs/operators";
import { fetchEvents, loadEvents } from "../actions";
import { EventsService } from "../../services";

@Injectable()
export class LoadEventsEffect {
  loadEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchEvents.type),
      exhaustMap(() =>
        this.eventsService.loadEvents().pipe(
          map(events => loadEvents({ events })),
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
