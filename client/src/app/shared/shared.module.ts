import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ContextMenuComponent } from "./components/context-menu/context-menu.component";

@NgModule({
  declarations: [ContextMenuComponent],
  imports: [CommonModule],
  exports: [ContextMenuComponent]
})
export class SharedModule {}
