import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { CalendarEvent } from "src/app/core/models/CalendarEvent";
import { CalendarService } from "../../services/calendar.service";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-calendar-date-picker",
  templateUrl: "./calendar-date-picker.component.html",
  styleUrls: ["./calendar-date-picker.component.scss"]
})
export class CalendarDatePickerComponent implements OnInit {
  // @Output() setMonth: EventEmitter<number> = new EventEmitter();
  // @Output() addEvent: EventEmitter<CalendarEvent> = new EventEmitter();

  showAddEvent = false;
  addEventModalOpen = false;
  addEventForm = this.fb.group({
    title: ["", Validators.required],
    date: [new Date().toString(), Validators.required],
    description: ["", Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private calendarService: CalendarService
  ) {}

  get title() {
    return this.addEventForm.get("title").value;
  }

  get description() {
    return this.addEventForm.get("description").value;
  }

  get date() {
    return new Date(this.addEventForm.get("date").value);
  }

  get dates$() {
    return this.calendarService.dates$;
  }

  ngOnInit() {}

  emitMonthChange(change, [year, month]) {
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

  toggleForm() {
    this.showAddEvent = !this.showAddEvent;
  }

  cancelForm() {
    this.addEventForm.reset();
    this.toggleForm();
  }

  submitForm() {
    const newEvent: CalendarEvent = {
      title: this.title,
      description: this.description,
      date: this.date
    };

    // this.addEvent.emit(newEvent);
    this.cancelForm();
  }
}
