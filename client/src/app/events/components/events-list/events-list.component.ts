import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { CalendarService } from "../../services/calendar.service";

@Component({
  selector: "app-events-list",
  templateUrl: "./events-list.component.html",
  styleUrls: ["./events-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsListComponent implements OnInit {
  constructor(private calendarService: CalendarService) {}

  ngOnInit() {}

  get events$() {
    return this.calendarService.events$;
  }
}
