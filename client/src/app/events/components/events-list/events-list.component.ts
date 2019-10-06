import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from "@angular/core";
import { CalendarService } from "../../services/calendar.service";
import { map } from "rxjs/operators";
import { Store } from "@ngrx/store";
import {
  getCurrentEvents,
  getOverdueEvents,
  getOverdueEventsExist
} from "@app/events/store/selectors";
import { IEvent } from "@app/events/store/reducers";
import { Observable } from "rxjs";

@Component({
  selector: "app-events-list",
  templateUrl: "./events-list.component.html",
  styleUrls: ["./events-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsListComponent implements OnInit {
  currentEvents$: Observable<IEvent[]>;
  overdueEvents$: Observable<IEvent[]>;
  overdueEventsExist$: Observable<boolean>;

  constructor(
    private calendarService: CalendarService,
    private store: Store<any>
  ) {
    this.currentEvents$ = this.store.select(getCurrentEvents);
    this.overdueEvents$ = this.store.select(getOverdueEvents);
    this.overdueEventsExist$ = this.store.select(getOverdueEventsExist);
  }

  get events$() {
    return this.calendarService.events$;
  }

  ngOnInit() {}
}
