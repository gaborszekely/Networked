import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-calendar-date-picker",
  templateUrl: "./calendar-date-picker.component.html",
  styleUrls: ["./calendar-date-picker.component.scss"]
})
export class CalendarDatePickerComponent implements OnInit {
  @Output() setMonth: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  emitMonthChange(change) {
    this.setMonth.emit(change);
  }
}
