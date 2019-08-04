import { Injectable } from '@angular/core';
import { CalendarDate } from 'src/app/core/models/CalendarDate';
import { CalendarHelpers } from '../helpers/calendar.helpers';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as EventsActions from '../store/events.actions';
import * as fromEvents from '../store/events.reducer';
import * as fromEventsSelectors from '../store/events.selectors';
import { Store } from '@ngrx/store';

@Injectable()
export class CalendarService {
  calendar$: Observable<any>;
  events$: Observable<fromEvents.IEvent[]>;

  calendarDays: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  private year = new BehaviorSubject<number>(new Date().getFullYear());
  private month = new BehaviorSubject<number>(new Date().getMonth());

  year$: Observable<number> = this.year.asObservable();
  month$: Observable<number> = this.month.asObservable();

  constructor(private store: Store<fromEvents.State>) {
    this.events$ = this.store.select(fromEventsSelectors.getEvents);
    this.store.dispatch(EventsActions.fetchEvents());
    this.generateCalendar();
  }

  private generateCalendar() {
    this.calendar$ = combineLatest(
      this.year$,
      this.month$,
      this.events$
      ).pipe(
      map(([year, month, events]) => {
        const days: CalendarDate[] = [];

        const monthStart = CalendarHelpers.getMonthStart(year, month);
        const monthEndDate = CalendarHelpers.getDaysInMonth(year, month);
        const monthEndDay = CalendarHelpers.getDay(year, month, monthEndDate);

        // Fill in days from previous month
        if (monthStart > 0) {
          for (let i = monthStart - 1; i >= 0; i--) {
            this.addDay('prev', year, month, i, days);
          }
        }

        // Fill in current days
        for (let i = 1; i <= monthEndDate; i++) {
          this.addDay('current', year, month, i, days);
        }

        // Fill in next month's days
        if (monthEndDay < 6) {
          for (let i = 1; i <= 6 - monthEndDay; i++) {
            this.addDay('next', year, month, i, days);
          }
        }

        // Attach events to days objects
        this.attachCalendarEvents(events, days);

        return {
          year,
          month,
          days
        };
      })
    );
  }

  private addDay(type: CalendarHelpers.NextType, year: number, month: number, day: number, days: CalendarDate[]): void {
    const date = new CalendarDate(
      CalendarHelpers.calculateDate(type, year, month, day)
    );
    days.push(date);
  }

  private attachCalendarEvents(events: fromEvents.IEvent[], days: CalendarDate[]): void {
    events.forEach(event => {
      const eventDate = days.find(day =>
        CalendarHelpers.isSameDate(day.date, event.date)
      );

      if (eventDate) {
        eventDate.events.push(event);
      }
    });
  }

  setMonth(value: number) {
    this.month.next(value);
  }

  setYear(value: number) {
    this.year.next(value);
  }
}
