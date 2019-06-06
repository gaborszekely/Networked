import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-calendar-wrapper",
  templateUrl: "./calendar-wrapper.component.html",
  styleUrls: ["./calendar-wrapper.component.scss"]
})
export class CalendarWrapperComponent implements OnInit {
  month: number = new Date().getMonth();
  year: number = new Date().getFullYear();

  constructor() {}

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
}
