import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { ApplicationBoardComponent } from "./application-board/application-board.component";

const routes: Routes = [
  {
    path: "board",
    component: ApplicationBoardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule {}
