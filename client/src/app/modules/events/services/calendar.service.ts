import { Injectable } from '@angular/core';
import { CalendarDate } from 'src/app/core/models/CalendarDate';
import { CalendarHelpers } from '../helpers/calendar.helpers';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CalendarEvent } from 'src/app/core/models/CalendarEvent';
import * as EventsActions from '../store/events.actions';
import * as fromEvents from '../store/events.reducer';
import * as fromEventsSelectors from '../store/events.selectors';
import { Store } from '@ngrx/store';
import { IEvent } from '../store/events.reducer';

const events: CalendarEvent[] = [
  {
    title: 'DenverScript Meetup',
    description: 'Description for test event 1',
    date: new Date(2019, 5, 11)
  },
  {
    title: 'AngularJS Meetup',
    description: 'Description for test event 2',
    date: new Date(2019, 5, 12)
  }
];

@Injectable()
export class CalendarService {
  calendar$: Observable<any>;
  days: CalendarDate[] = [];

  private year = new BehaviorSubject(new Date().getFullYear());
  private month = new BehaviorSubject(new Date().getMonth());
  private events = new BehaviorSubject(events);

  year$: Observable<number> = this.year.asObservable();
  month$: Observable<number> = this.month.asObservable();
  dates$: Observable<number[]> = combineLatest(this.year$, this.month$);

  events$: Observable<IEvent[]> = of([]);

  constructor(private store: Store<fromEvents.State>) {
    this.events$ = this.store.select(fromEventsSelectors.getEvents);
    this.store.dispatch(EventsActions.fetchEvents());
    this.generateCalendar();
  }

  generateCalendar() {
    this.calendar$ = combineLatest(this.dates$, this.events$).pipe(
      map(([[year, month], events]) => {
        const newDays: CalendarDate[] = [];
        const monthStart = CalendarHelpers.getMonthStart(year, month);
        const monthEndDate = CalendarHelpers.getDaysInMonth(year, month);
        const monthEndDay = CalendarHelpers.getDay(year, month, monthEndDate);

        // Fill in days from previous month
        if (monthStart > 0) {
          for (let i = monthStart - 1; i >= 0; i--) {
            const prevMonthDate: CalendarDate = {
              date: CalendarHelpers.calculateDate('prev', year, month, i)
            };
            newDays.push(prevMonthDate);
          }
        }

        // Fill in current days
        for (let i = 1; i <= monthEndDate; i++) {
          const monthDate: CalendarDate = {
            date: CalendarHelpers.calculateDate('current', year, month, i)
          };
          newDays.push(monthDate);
        }

        // Fill in next month's days
        if (monthEndDay < 6) {
          for (let i = 1; i <= 6 - monthEndDay; i++) {
            const nextMonthDate: CalendarDate = {
              date: CalendarHelpers.calculateDate('next', year, month, i)
            };
            newDays.push(nextMonthDate);
          }
        }

        // Attach events to days objects
        events.forEach(event => {
          const eventDate = newDays.find(day =>
            CalendarHelpers.isSameDate(day.date, event.date)
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
