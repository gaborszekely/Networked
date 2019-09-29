import { Injectable } from "@angular/core";
import { EventsModule } from "../events.module";
import { CalendarDate } from "@core/models/CalendarDate";
import {
  getMonthStart,
  getDaysInMonth,
  getDay,
  calculateDate,
  isSameDate
} from "@helpers/calendarHelpers";
import { Subject, Observable, BehaviorSubject, combineLatest, of } from "rxjs";
import { switchMap, map, tap } from "rxjs/operators";
import { CalendarEvent } from "@core/models/CalendarEvent";
import * as EventsActions from "../store/actions/events.actions";
import * as fromEvents from "../store/reducers/events.reducer";
import { Store } from "@ngrx/store";
import { IEvent } from "../store/reducers/events.reducer";

const events: CalendarEvent[] = [
  {
    title: "DenverScript Meetup",
    description: "Description for test event 1",
    date: new Date(2019, 5, 11)
  },
  {
    title: "AngularJS Meetup",
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
  // events$: Observable<CalendarEvent[]> = this.events.asObservable();
  calendar$: Observable<any>;
  events$: Observable<IEvent[]> = of([]);

  constructor(private store: Store<fromEvents.State>) {
    this.events$ = store.select((state: any) => {
      const events = state.events.ids.map(
        (id: string) => state.events.entities[id]
      );
      return events.map(event => ({
        ...event,
        date: new Date(event.date)
      }));
    });
    store.dispatch(EventsActions.fetchEvents());
    this.generateCalendar();
    // this.events$.subscribe(events => console.log("Our events: ", events));
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
