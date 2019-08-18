import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { ContentAreaComponent } from "./components/content-area/content-area.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { ClarityModule } from "@clr/angular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    NavbarComponent,
    SidenavComponent,
    ContentAreaComponent,
    LayoutComponent
  ],
  imports: [CommonModule, ClarityModule, BrowserAnimationsModule, RouterModule],
  exports: [LayoutComponent]
})
export class UiModule {}
