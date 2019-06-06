import { Component, OnInit, Input, OnChanges } from "@angular/core";

interface CalendarDate {
  date: number;
  month: number;
  year: number;
}

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent implements OnInit, OnChanges {
  days: CalendarDate[];
  calendarDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  @Input() month: number = new Date().getMonth();
  @Input() year: number = new Date().getFullYear();

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.generateCalendar();
  }

  private generateCalendar() {
    const newDays = [];
    const monthStart: number = this.getMonthStart();
    const monthEndDate = this.getDaysInMonth(this.year, this.month);
    const monthEndDay = new Date(this.year, this.month, monthEndDate).getDay();

    // Fill in days from previous month
    if (monthStart > 0) {
      const prevMonth = this.month > 0 ? this.month - 1 : 11;
      const prevYear = this.month > 0 ? this.year : this.year - 1;
      const prevMonthStart = this.getDaysInMonth(prevYear, prevMonth);

      for (let i = monthStart - 1; i >= 0; i--) {
        const prevMonthDate: CalendarDate = {
          date: prevMonthStart - i + 1,
          month: prevMonth,
          year: prevYear
        };
        newDays.push(prevMonthDate);
      }
    }

    // Fill in current days
    for (let i = 1; i <= monthEndDate; i++) {
      const monthDate: CalendarDate = {
        date: i,
        month: this.month,
        year: this.year
      };
      newDays.push(monthDate);
    }

    // Fill in next month's days
    if (monthEndDay < 6) {
      const nextMonth = this.month < 11 ? this.month + 1 : 1;
      const nextYear = this.month < 11 ? this.year : this.year + 1;

      for (let i = 1; i <= 6 - monthEndDay; i++) {
        const nextMonthDate: CalendarDate = {
          date: i,
          month: nextMonth,
          year: nextYear
        };
        newDays.push(nextMonthDate);
      }
    }

    this.days = newDays;
  }

  private getMonthStart() {
    const monthStart = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );

    return new Date(monthStart).getDay();
  }

  private getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  getDate(year, month, day) {
    return new Date(year, month, day);
  }

  getDayClass(month) {
    return {
      "non-current-month": month !== this.month
    };
  }
}
