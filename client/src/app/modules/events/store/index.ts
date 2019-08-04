import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
  combineReducers
} from '@ngrx/store';
import * as fromEvents from './events.reducer';

export interface EventsState {
  events: fromEvents.State;
}

export const reducers: ActionReducerMap<EventsState> = {
  events: fromEvents.reducer
};

export const eventsReducers = combineReducers(reducers);

export const selectEventsState = createFeatureSelector<fromEvents.State>(
  'events'
);

export const selectEventIds = createSelector(
  selectEventsState,
  fromEvents.selectEventIds
);

export const selectEventEntities = createSelector(
  selectEventsState,
  fromEvents.selectEventEntities
);

export const selectAllEvents = createSelector(
  selectEventsState,
  fromEvents.selectAllEvents
);

export const selectEventTotal = createSelector(
  selectEventsState,
  fromEvents.selectEventTotal
);

export const selectCurrentEventId = createSelector(
  selectEventsState,
  fromEvents.getSelectedEventId
);

export const selectCurrentEvent = createSelector(
  selectEventEntities,
  selectCurrentEventId,
  (eventEntities, eventId) => eventEntities[eventId]
);
