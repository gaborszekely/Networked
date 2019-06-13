import { Component, OnInit } from "@angular/core";
import { CalendarEvent } from "src/app/core/models/CalendarEvent";
import { CalendarService } from "../../services/calendar.service";

@Component({
  selector: "app-calendar-wrapper",
  templateUrl: "./calendar-wrapper.component.html",
  styleUrls: ["./calendar-wrapper.component.scss"]
})
export class CalendarWrapperComponent implements OnInit {
  month = new Date().getMonth();
  year = new Date().getFullYear();
  events: CalendarEvent[] = [
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
  calendarMonths: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  constructor(private calendarService: CalendarService) {}

  get month$() {
    return this.calendarService.month$;
  }

  get year$() {
    return this.calendarService.year$;
  }

  ngOnInit() {}

  setMonth(change: number) {
    const newMonth = this.month + change;
    if (newMonth === 12) {
      this.month = 0;
      this.year += 1;
    } else if (newMonth === -1) {
      this.month = 11;
      this.year -= 1;
    } else {
      this.month = newMonth;
    }
  }

  addNewEvent(event: CalendarEvent) {
    this.events = [...this.events, event];
    console.log(this.events);
  }
}
