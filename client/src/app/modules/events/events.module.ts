import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { CalendarWrapperComponent } from "./components/calendar-wrapper/calendar-wrapper.component";
import { EventsRoutingModule } from "./events-routing.module";
import { CalendarDatePickerComponent } from './components/calendar-date-picker/calendar-date-picker.component';

@NgModule({
  declarations: [CalendarComponent, CalendarWrapperComponent, CalendarDatePickerComponent],
  imports: [CommonModule, EventsRoutingModule]
})
export class EventsModule {}
