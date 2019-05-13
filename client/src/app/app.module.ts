import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ClarityModule } from "@clr/angular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ConnectionsComponent } from "./components/connections/connections.component";
import { ConnectionComponent } from "./components/connection/connection.component";
import { AddConnectionComponent } from "./components/add-connection/add-connection.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { ContentAreaComponent } from "./components/content-area/content-area.component";
import { ContactComponent } from "./components/contact/contact.component";
import { AddContactComponent } from "./components/add-contact/add-contact.component";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { NotesComponent } from "./components/notes/notes.component";

const appRoutes: Routes = [
  { path: "add", component: AddContactComponent },
  { path: "contacts", component: ConnectionsComponent },
  { path: "contacts/:id", component: ContactComponent },
  { path: "notes", component: NotesComponent },
  { path: "login", component: LoginPageComponent }
  // { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConnectionsComponent,
    ConnectionComponent,
    AddConnectionComponent,
    ContactComponent,
    AddContactComponent,
    SidenavComponent,
    ContentAreaComponent,
    LoginPageComponent,
    NotesComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
      // { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
