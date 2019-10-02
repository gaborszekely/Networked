import { AddEventEffect } from "./addEvent.effects";
import { DeleteEventEffect } from "./deleteEvent.effects";
import { LoadEventsEffect } from "./loadEvents.effects";

export * from "./events.effects";
// export * from "./loadEvents.effects";
// export * from "./addEvent.effects";
// export * from "./deleteEvent.effects";

export const EVENTS_EFFECTS = [
  AddEventEffect,
  DeleteEventEffect,
  LoadEventsEffect
];
