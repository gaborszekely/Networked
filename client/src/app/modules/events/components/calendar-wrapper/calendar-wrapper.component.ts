import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { CalendarService } from "../../services/calendar.service";

@Component({
  selector: "app-calendar-wrapper",
  templateUrl: "./calendar-wrapper.component.html",
  styleUrls: ["./calendar-wrapper.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarWrapperComponent {
  constructor(private calendarService: CalendarService) {}

  get month$() {
    return this.calendarService.month$;
  }

  get year$() {
    return this.calendarService.year$;
  }
}
