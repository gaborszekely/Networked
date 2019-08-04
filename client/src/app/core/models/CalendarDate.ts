import { CalendarEvent } from './CalendarEvent';

export class CalendarDate {
  events: CalendarEvent[] = [];

  constructor(public date: Date) {}
}
