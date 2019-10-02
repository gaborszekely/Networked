import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";
import { Validators, FormBuilder } from "@angular/forms";
import { CalendarEvent } from "@core/models/CalendarEvent";
import { CalendarService } from "../../services/calendar.service";
import { tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { State, IEvent } from "../../store/reducers/events.reducer";
import * as EventsActions from "../../store/actions/events.actions";

@Component({
  selector: "app-calendar-date-picker",
  templateUrl: "./calendar-date-picker.component.html",
  styleUrls: ["./calendar-date-picker.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarDatePickerComponent implements OnInit {
  showAddEvent = false;
  addEventModalOpen = false;
  addEventForm = this.fb.group({
    title: ["", Validators.required],
    date: [new Date().toString(), Validators.required],
    description: ["", Validators.required],
    tags: ["", Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private calendarService: CalendarService,
    private store: Store<State>
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

  get tags() {
    return this.addEventForm
      .get("tags")
      .value.split(",")
      .map((tag: string) => tag.trim());
  }

  get calendar$() {
    return this.calendarService.calendar$;
  }

  ngOnInit() {}

  emitMonthChange(change, year, month) {
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

  addNewEvent(event: IEvent) {
    // this.calendarService.setEvents([...events, event]);
    this.store.dispatch(EventsActions.addEventAPI({ event }));
  }

  toggleForm() {
    this.showAddEvent = !this.showAddEvent;
  }

  cancelForm() {
    this.addEventForm.reset();
    this.toggleForm();
  }

  submitForm() {
    const newEvent: IEvent = {
      title: this.title,
      description: this.description,
      date: this.date,
      tags: this.tags
    };

    this.addNewEvent(newEvent);
    this.cancelForm();
  }
}
