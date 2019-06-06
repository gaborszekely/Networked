import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CalendarWrapperComponent } from "./components/calendar-wrapper/calendar-wrapper.component";

const routes: Routes = [{ path: "", component: CalendarWrapperComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {}
