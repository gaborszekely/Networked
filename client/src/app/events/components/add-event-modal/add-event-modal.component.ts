import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input
} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { IEvent, State } from "@app/events/store/reducers";
import * as EventsActions from "../../store/actions/events.actions";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-add-event-modal",
  templateUrl: "./add-event-modal.component.html",
  styleUrls: ["./add-event-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEventModalComponent implements OnInit {
  @Input() showAddEvent = false;
  @Input() events: any;

  addEventModalOpen = false;

  addEventForm = this.fb.group({
    title: ["", Validators.required],
    date: [new Date().toString(), Validators.required],
    description: ["", Validators.required],
    tags: ["", Validators.required]
  });

  constructor(private fb: FormBuilder, private store: Store<State>) {}

  get title(): string {
    return this.addEventForm.get("title").value;
  }

  get description(): string {
    return this.addEventForm.get("description").value;
  }

  get date(): Date {
    return new Date(this.addEventForm.get("date").value);
  }

  get tags(): string[] {
    return this.addEventForm
      .get("tags")
      .value.split(",")
      .map((tag: string) => tag.trim());
  }

  ngOnInit() {}

  addNewEvent(event: IEvent) {
    this.store.dispatch(EventsActions.addEventRequested({ event }));
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
