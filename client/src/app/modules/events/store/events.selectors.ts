import { createSelector } from '@ngrx/store';
import * as fromEvents from '../store/events.reducer';

// export const getCalendarState = (state: fromEvents.State) => state.events;

// export const getEvents = createSelector(
//     getCalendarState,
//     state => state.events
// )

export const getEvents = (state: any) => {
  const events = state.events.ids.map(
    (id: string) => state.events.entities[id]
  );
  return events.map(event => ({
    ...event,
    date: new Date(event.date)
  }));
};
