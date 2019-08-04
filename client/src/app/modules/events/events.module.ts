/* MODULES */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EventsRoutingModule } from './events-routing.module';

/* COMPONENTS */
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarWrapperComponent } from './components/calendar-wrapper/calendar-wrapper.component';
import { CalendarDatePickerComponent } from './components/calendar-date-picker/calendar-date-picker.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { ListEventComponent } from './components/list-event/list-event.component';

/* SERVICES */
import { CalendarService } from './services/calendar.service';
import { EventsService } from './services/events.service';

/* PIPES */
import { MonthPipe } from './pipes/month.pipe';

/* NGRX */

import { EventsEffects } from './store/events.effects';
import { eventsReducer } from './store/events.reducer';

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
    StoreModule.forFeature('events', eventsReducer),
    EffectsModule.forFeature([EventsEffects])
  ],
  providers: [CalendarService, EventsService]
})
export class EventsModule {}
