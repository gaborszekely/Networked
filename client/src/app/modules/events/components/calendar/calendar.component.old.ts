import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CalendarEvent } from 'src/app/core/models/CalendarEvent';
import { CalendarDate } from 'src/app/core/models/CalendarDate';
import {
  CalendarHelpers
} from '../../helpers/calendar.helpers';

@Component({
  selector: 'app-calendar-old',
  templateUrl: './calendar.component.old.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() month: number;
  @Input() year: number;
  @Input() events: CalendarEvent[];
  currentDate = new Date().getDate();
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  days: CalendarDate[];
  calendarDays: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  constructor() {}

  get currentDateFormatted() {
    return new Date(this.currentYear, this.currentMonth, this.currentDate);
  }

  ngOnInit() {
    console.log('OLD');
  }

  ngOnChanges() {
    this.generateCalendar(this.events);
  }

  private generateCalendar(events: CalendarEvent[] = []) {
    const newDays: CalendarDate[] = [];
    const monthStart = CalendarHelpers.getMonthStart(this.year, this.month);
    const monthEndDate = CalendarHelpers.getDaysInMonth(this.year, this.month);
    const monthEndDay = CalendarHelpers.getDay(this.year, this.month, monthEndDate);

    // Fill in days from previous month
    if (monthStart > 0) {
      for (let i = monthStart - 1; i >= 0; i--) {
        const prevMonthDate: CalendarDate = {
          date: CalendarHelpers.calculateDate('prev', this.year, this.month, i)
        };
        newDays.push(prevMonthDate);
      }
    }

    // Fill in current days
    for (let i = 1; i <= monthEndDate; i++) {
      const monthDate: CalendarDate = {
        date: CalendarHelpers.calculateDate('current', this.year, this.month, i)
      };
      newDays.push(monthDate);
    }

    // Fill in next month's days
    if (monthEndDay < 6) {
      for (let i = 1; i <= 6 - monthEndDay; i++) {
        const nextMonthDate: CalendarDate = {
          date: CalendarHelpers.calculateDate('next', this.year, this.month, i)
        };
        newDays.push(nextMonthDate);
      }
    }

    // Attach events to days objects
    events.forEach(event => {
      const eventDate = newDays.find(day => CalendarHelpers.isSameDate(day.date, event.date));
      if (eventDate) {
        eventDate.events = eventDate.events
          ? [...eventDate.events, event]
          : [event];
      }
    });

    this.days = newDays;
  }

  getNonCurrentMonthClass(date: Date): { 'non-current-month': boolean } {
    return {
      'non-current-month': date.getMonth() !== this.month
    };
  }

  getCurrentDateClass(date: Date): { 'current-day': boolean } {
    return {
      'current-day': CalendarHelpers.isSameDate(date, this.currentDateFormatted)
    };
  }
}
