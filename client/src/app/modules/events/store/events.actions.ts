import { createAction, props } from "@ngrx/store";
import { Update, EntityMap, Predicate } from "@ngrx/entity";
import { IEvent } from "./events.reducer";

export const fetchEvents = createAction("[Event/API] Fetch Events");

export const loadEvents = createAction(
  "[Event/API] Load Events",
  props<{ events: IEvent[] }>()
);

export const addEventAPI = createAction(
  "[Event/API] Add Event API",
  props<{ event: IEvent }>()
);

export const addEvent = createAction(
  "[Event/API] Add Event",
  props<{ event: IEvent }>()
);

export const addEvents = createAction(
  "[Event/API] Add Events",
  props<{ events: IEvent[] }>()
);

export const upsertEvent = createAction(
  "[Event/API] Upsert Event",
  props<{ event: IEvent }>()
);

export const upsertEvents = createAction(
  "[Event/API] Upsert Events",
  props<{ events: IEvent[] }>()
);

export const updateEvent = createAction(
  "[Event/API] Update Event",
  props<{ event: Update<IEvent> }>()
);

export const updateEvents = createAction(
  "[Event/API] Update Events",
  props<{ events: Update<IEvent>[] }>()
);

export const mapEvents = createAction(
  "[Event/API] Map Events",
  props<{ entityMap: EntityMap<IEvent> }>()
);

export const deleteEventAPI = createAction(
  "[Event/API] Delete Event API",
  props<{ _id: string }>()
);

export const deleteEvent = createAction(
  "[Event/API] Delete Event",
  props<{ _id: string }>()
);

export const deleteEvents = createAction(
  "[Event/API] Delete Events",
  props<{ ids: string[] }>()
);

export const deleteEventsByPredicate = createAction(
  "[Event/API] Delete Events By Predicate",
  props<{ predicate: Predicate<IEvent> }>()
);

export const clearEvents = createAction("[Event/API] Clear Events");
