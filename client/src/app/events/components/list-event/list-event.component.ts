import { Component, OnInit, Input } from "@angular/core";
import { IEvent, State } from "../../store/reducers/events.reducer";
import { Store } from "@ngrx/store";
import * as EventsActions from "../../store/actions/events.actions";

@Component({
  selector: "app-list-event",
  templateUrl: "./list-event.component.html",
  styleUrls: ["./list-event.component.scss"]
})
export class ListEventComponent implements OnInit {
  @Input() event: IEvent;
  showEdit = false;

  constructor(private store: Store<State>) {}

  ngOnInit() {}

  deleteEvent(event: IEvent) {
    this.store.dispatch(EventsActions.deleteEventAPI({ _id: event._id }));
  }

  toggleEdit() {
    this.showEdit = !this.showEdit;
    console.log(this.showEdit);
  }
}
