import { Component, OnInit, Input, OnChanges } from "@angular/core";

interface CalendarDate {
  date: Date;
}

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() month: number;
  @Input() year: number;
  days: CalendarDate[];
  calendarDays: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.generateCalendar();
  }

  private generateCalendar() {
    const newDays: CalendarDate[] = [];
    const monthStart: number = this.getMonthStart(this.year, this.month);
    const monthEndDate: number = this.getDaysInMonth(this.year, this.month);
    const monthEndDay: number = new Date(
      this.year,
      this.month,
      monthEndDate
    ).getDay();

    // Fill in days from previous month
    if (monthStart > 0) {
      const prevMonth = this.month > 0 ? this.month - 1 : 11;
      const prevYear = this.month > 0 ? this.year : this.year - 1;
      const prevMonthStart = this.getDaysInMonth(prevYear, prevMonth);

      for (let i = monthStart - 1; i >= 0; i--) {
        const prevMonthDate: CalendarDate = {
          date: new Date(prevYear, prevMonth, prevMonthStart - i)
        };
        newDays.push(prevMonthDate);
      }
    }

    // Fill in current days
    for (let i = 1; i <= monthEndDate; i++) {
      const monthDate: CalendarDate = {
        date: new Date(this.year, this.month, i)
      };
      newDays.push(monthDate);
    }

    // Fill in next month's days
    if (monthEndDay < 6) {
      const nextMonth = this.month < 11 ? this.month + 1 : 1;
      const nextYear = this.month < 11 ? this.year : this.year + 1;

      for (let i = 1; i <= 6 - monthEndDay; i++) {
        const nextMonthDate: CalendarDate = {
          date: new Date(nextYear, nextMonth, i)
        };
        newDays.push(nextMonthDate);
      }
    }

    this.days = newDays;
  }

  private getMonthStart(year: number, month: number) {
    return new Date(year, month, 1).getDay();
  }

  private getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  getDate(year: number, month: number, day: number) {
    return new Date(year, month, day);
  }

  getDayClass(date: Date) {
    return {
      "non-current-month": date.getMonth() !== this.month
    };
  }
}
