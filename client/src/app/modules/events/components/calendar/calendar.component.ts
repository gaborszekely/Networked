import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarHelpers } from '../../helpers/calendar.helpers';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {
  currentDate = new Date().getDate();
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  calendarDays: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  constructor(private calendarService: CalendarService) {}

  get days$() {
    return this.calendarService.calendar$;
  }

  get currentDateFormatted() {
    return new Date(this.currentYear, this.currentMonth, this.currentDate);
  }

  ngOnInit() {}

  getNonCurrentMonthClass(
    date: Date,
    month: number
  ): { 'non-current-month': boolean } {
    return {
      'non-current-month': date.getMonth() !== month
    };
  }

  getCurrentDateClass(date: Date): { 'current-day': boolean } {
    return {
      'current-day': CalendarHelpers.isSameDate(date, this.currentDateFormatted)
    };
  }
}
