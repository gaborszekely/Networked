import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EventsState } from "../events.state";
import * as fromEvents from "../reducers/events.reducer";

const getEventsState = createFeatureSelector<fromEvents.State>("events");

export const getEvents = createSelector(
  getEventsState,
  state => {
    const events = (state.ids as any[]).map(id => state.entities[id]);
    return events
      .map(event => ({
        ...event,
        date: new Date(event.date)
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }
);

export const getCurrentEvents = createSelector(
  getEvents,
  events => events.filter(event => event.date >= new Date())
);

export const getOverdueEvents = createSelector(
  getEvents,
  events => events.filter(event => event.date < new Date())
);

export const getOverdueEventsExist = createSelector(
  getOverdueEvents,
  events => events.length > 0
);
