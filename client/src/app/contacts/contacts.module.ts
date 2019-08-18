import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClarityModule } from "@clr/angular";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "src/app/core/interceptors/CustomHttpInterceptor";

import { ContactsRoutingModule } from "./contacts-routing.module";

/* COMPONENTS */
import { ConnectionsComponent } from "./components/connections/connections.component";
import { ConnectionComponent } from "./components/connection/connection.component";
import { NoteComponent } from "./components/note/note.component";
import { NotesComponent } from "./components/notes/notes.component";
import { ContactComponent } from "./components/contact/contact.component";
import { AddContactComponent } from "./components/add-contact/add-contact.component";
import { ContactsHomeComponent } from "./components/contacts-home/contacts-home.component";

import { contactsReducer } from "./store/reducers";
import { ContactsEffects } from "./store/effects";

@NgModule({
  declarations: [
    ConnectionsComponent,
    ConnectionComponent,
    NoteComponent,
    NotesComponent,
    ContactComponent,
    AddContactComponent,
    ContactsHomeComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature("contacts", contactsReducer),
    EffectsModule.forFeature([ContactsEffects]),
    ContactsRoutingModule
  ]
  // providers: [
  //   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  // ]
})
export class ContactsModule {}
