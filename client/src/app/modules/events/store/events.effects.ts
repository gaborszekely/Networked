import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, NEVER } from 'rxjs';
import { map, mergeMap, switchMap, catchError, take } from 'rxjs/operators';
import * as EventsActions from './events.actions';
import { EventsService } from '../services/events.service';

@Injectable()
export class EventsEffects {
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
