import { Injectable } from "@angular/core";
import { EventsModule } from "../events.module";
import { CalendarDate } from "src/app/core/models/CalendarDate";
import {
  getMonthStart,
  getDaysInMonth,
  getDay,
  calculateDate,
  isSameDate
} from "src/helpers/calendarHelpers";
import { Subject, Observable, BehaviorSubject, combineLatest } from "rxjs";
import { switchMap, map, tap } from "rxjs/operators";
import { CalendarEvent } from "src/app/core/models/CalendarEvent";

const events: CalendarEvent[] = [
  {
    title: "Test Event 1",
    description: "Description for test event 1",
    date: new Date(2019, 5, 11)
  },
  {
    title: "Test Event 2",
    description: "Description for test event 2",
    date: new Date(2019, 5, 12)
  }
];

@Injectable()
export class CalendarService {
  days: CalendarDate[] = [];
  private year = new BehaviorSubject(new Date().getFullYear());
  private month = new BehaviorSubject(new Date().getMonth());
  private events = new BehaviorSubject(events);
  year$: Observable<number> = this.year.asObservable();
  month$: Observable<number> = this.month.asObservable();
  dates$: Observable<number[]> = combineLatest(this.year$, this.month$);
  events$: Observable<CalendarEvent[]> = this.events.asObservable();
  calendar$: Observable<any>;

  constructor() {
    this.generateCalendar();
  }

  generateCalendar() {
    this.calendar$ = combineLatest(this.dates$, this.events$).pipe(
      map(([[year, month], events]) => {
        const newDays: CalendarDate[] = [];
        const monthStart = getMonthStart(year, month);
        const monthEndDate = getDaysInMonth(year, month);
        const monthEndDay = getDay(year, month, monthEndDate);

        // Fill in days from previous month
        if (monthStart > 0) {
          for (let i = monthStart - 1; i >= 0; i--) {
            const prevMonthDate: CalendarDate = {
              date: calculateDate("prev", year, month, i)
            };
            newDays.push(prevMonthDate);
          }
        }

        // Fill in current days
        for (let i = 1; i <= monthEndDate; i++) {
          const monthDate: CalendarDate = {
            date: calculateDate("current", year, month, i)
          };
          newDays.push(monthDate);
        }

        // Fill in next month's days
        if (monthEndDay < 6) {
          for (let i = 1; i <= 6 - monthEndDay; i++) {
            const nextMonthDate: CalendarDate = {
              date: calculateDate("next", year, month, i)
            };
            newDays.push(nextMonthDate);
          }
        }

        // Attach events to days objects
        events.forEach(event => {
          const eventDate = newDays.find(day =>
            isSameDate(day.date, event.date)
          );
          if (eventDate) {
            eventDate.events = eventDate.events
              ? [...eventDate.events, event]
              : [event];
          }
        });

        return {
          year,
          month,
          events,
          days: newDays
        };
      })
    );
  }

  public setMonth(value: number) {
    this.month.next(value);
  }

  public setYear(value: number) {
    this.year.next(value);
  }

  public setEvents(events: CalendarEvent[]) {
    this.events.next(events);
  }
}
