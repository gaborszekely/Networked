import { NgModule } from "@angular/core";
import { ApplicationBoardComponent } from "./application-board/application-board.component";
import { CommonModule } from "@angular/common";
import { JobsRoutingModule } from "./jobs-routing.module";

@NgModule({
  declarations: [ApplicationBoardComponent],
  providers: [],
  imports: [CommonModule, JobsRoutingModule],
  exports: []
})
export class JobsModule {}
