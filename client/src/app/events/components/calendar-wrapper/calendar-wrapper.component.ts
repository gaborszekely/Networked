import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { CalendarService } from "../../services/calendar.service";
import { Store } from "@ngrx/store";
import * as fromEvents from "../../store/reducers/events.reducer";
import { fetchEvents } from "@app/events/store/actions";

@Component({
  selector: "app-calendar-wrapper",
  templateUrl: "./calendar-wrapper.component.html",
  styleUrls: ["./calendar-wrapper.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarWrapperComponent implements OnInit {
  constructor(
    private calendarService: CalendarService,
    private store: Store<fromEvents.State>
  ) {}

  get month$() {
    return this.calendarService.month$;
  }

  get year$() {
    return this.calendarService.year$;
  }

  ngOnInit() {
    this.store.dispatch(fetchEvents());
  }
}
