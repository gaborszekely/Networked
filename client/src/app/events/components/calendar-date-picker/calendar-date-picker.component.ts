import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { CalendarService } from "../../services/calendar.service";

@Component({
  selector: "app-calendar-date-picker",
  templateUrl: "./calendar-date-picker.component.html",
  styleUrls: ["./calendar-date-picker.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarDatePickerComponent implements OnInit {
  constructor(private calendarService: CalendarService) {}

  get calendar$() {
    return this.calendarService.calendar$;
  }

  ngOnInit() {}

  emitMonthChange(change: number, year: number, month: number): void {
    const newMonth = month + change;
    if (newMonth === 12) {
      this.calendarService.setMonth(0);
      this.calendarService.setYear(year + 1);
    } else if (newMonth === -1) {
      this.calendarService.setMonth(11);
      this.calendarService.setYear(year - 1);
    } else {
      this.calendarService.setMonth(newMonth);
    }
  }
}
