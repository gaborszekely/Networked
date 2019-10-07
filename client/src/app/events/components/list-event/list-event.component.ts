import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from "@angular/core";
import { IEvent, State } from "../../store/reducers/events.reducer";
import { Store } from "@ngrx/store";
import * as EventsActions from "../../store/actions/events.actions";

@Component({
  selector: "app-list-event",
  templateUrl: "./list-event.component.html",
  styleUrls: ["./list-event.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListEventComponent implements OnInit {
  @Input() event: IEvent;
  @Input() overdue: boolean = false;

  showEdit = false;

  constructor(private store: Store<State>) {}

  ngOnInit() {}

  deleteEvent(event: IEvent) {
    this.store.dispatch(EventsActions.deleteEventAPI({ _id: event._id }));
  }

  toggleEdit() {
    this.showEdit = !this.showEdit;
  }

  isOverdue(eventDate: Date) {
    return eventDate < new Date();
  }
}
