import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ClarityModule } from "@clr/angular";
import { EventsRoutingModule } from "./events-routing.module";

import { CalendarComponent } from "./components/calendar/calendar.component";
import { CalendarWrapperComponent } from "./components/calendar-wrapper/calendar-wrapper.component";
import { CalendarDatePickerComponent } from "./components/calendar-date-picker/calendar-date-picker.component";
import { CalendarService } from "./services/calendar.service";

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarWrapperComponent,
    CalendarDatePickerComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    ClarityModule,
    ReactiveFormsModule
  ],
  providers: [CalendarService]
})
export class EventsModule {}
