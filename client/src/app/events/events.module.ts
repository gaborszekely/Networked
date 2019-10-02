/* Modules */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ClarityModule } from "@clr/angular";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { EventsRoutingModule } from "./events-routing.module";

/* Components */
import { CalendarComponent } from "./components/calendar/calendar.component";
import { CalendarWrapperComponent } from "./components/calendar-wrapper/calendar-wrapper.component";
import { CalendarDatePickerComponent } from "./components/calendar-date-picker/calendar-date-picker.component";
import { EventsListComponent } from "./components/events-list/events-list.component";
import { ListEventComponent } from "./components/list-event/list-event.component";

/* Services */
import { CalendarService } from "./services";
import { EventsService } from "./services";

/* Pipes */
import { MonthPipe } from "./pipes/month.pipe";

/* Ngrx */
import { EventsEffects, EVENTS_EFFECTS } from "./store/effects";
import { eventsReducer } from "./store/reducers";

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarWrapperComponent,
    CalendarDatePickerComponent,
    MonthPipe,
    EventsListComponent,
    ListEventComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    ClarityModule,
    ReactiveFormsModule,
    StoreModule.forFeature("events", eventsReducer),
    EffectsModule.forFeature(EVENTS_EFFECTS)
  ],
  providers: [CalendarService, EventsService]
})
export class EventsModule {}
