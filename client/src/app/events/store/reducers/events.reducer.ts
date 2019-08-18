import { Action, createReducer, on } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { compareDate } from "@helpers/datehelpers";
import * as EventActions from "../actions";

export interface IEvent {
  _id?: string;
  title: string;
  date: Date;
  description: string;
  tags: string[];
  created_at?: Date;
  updated_at?: Date;
}

export interface State extends EntityState<IEvent> {
  // additional entities state properties
  selectedEventId: string | null;
}

export const selectEventId = (event: IEvent): string => event._id;

export const sortByDate = (a: IEvent, b: IEvent): number => {
  return compareDate(new Date(a.date), new Date(b.date), "asc");
};

export const adapter: EntityAdapter<IEvent> = createEntityAdapter<IEvent>({
  selectId: selectEventId,
  sortComparer: sortByDate
});

export const initialState: State = adapter.getInitialState({
  selectedEventId: null
});

export const reducer = createReducer(
  initialState,
  on(EventActions.addEvent, (state, { event }) => {
    return adapter.addOne(event, state);
  }),
  on(EventActions.upsertEvent, (state, { event }) => {
    return adapter.upsertOne(event, state);
  }),
  on(EventActions.addEvents, (state, { events }) => {
    return adapter.addMany(events, state);
  }),
  on(EventActions.upsertEvents, (state, { events }) => {
    return adapter.upsertMany(events, state);
  }),
  on(EventActions.updateEvent, (state, { event }) => {
    return adapter.updateOne(event, state);
  }),
  on(EventActions.updateEvents, (state, { events }) => {
    return adapter.updateMany(events, state);
  }),
  on(EventActions.mapEvents, (state, { entityMap }) => {
    return adapter.map(entityMap, state);
  }),
  on(EventActions.deleteEvent, (state, { _id }) => {
    return adapter.removeOne(_id, state);
  }),
  on(EventActions.deleteEvents, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(EventActions.deleteEventsByPredicate, (state, { predicate }) => {
    return adapter.removeMany(predicate, state);
  }),
  on(EventActions.loadEvents, (state, { events }) => {
    return adapter.addAll(events, state);
  }),
  on(EventActions.clearEvents, state => {
    return adapter.removeAll({ ...state, selectedEventId: null });
  })
);

export const eventsReducer = (state: State, action: Action): State => {
  return reducer(state, action);
};

export const getSelectedEventId = (state: State): string =>
  state.selectedEventId;

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

// select the array of event ids
export const selectEventIds = selectIds;

// select the dictionary of event entities
export const selectEventEntities = selectEntities;

// select the array of events
export const selectAllEvents = selectAll;
// export const selectAllEvents = state => {
//   console.log("i am called");
//   // return Object.values(state.entities);
//   // const events = state.ids.map((id: string) => state.entities[id]);
//   // return events.map(event => ({
//   //   ...event,
//   //   date: new Date(event.date)
//   // }));
// };

// select the total event count
export const selectEventTotal = selectTotal;
