/* MODULES */
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AppRoutingModule } from "./app-routing.module";

/* COMPONENTS */
import { AppComponent } from "./app.component";
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
import { AccountComponent } from "./components/account/account.component";
import { FaqComponent } from "./components/faq/faq.component";

/* REDUCERS */
import { contactsReducer } from "./reducers/contacts.reducer";
import { userReducer } from "./reducers/user.reducer";

/* EFFECTS */
import { ContactsEffects } from "./effects/contacts.effects";
import { UserEffects } from "./effects/user.effects";

/* OTHER */
import { AuthInterceptor } from "./interceptors/CustomHttpInterceptor";
import { NoteComponent } from './components/note/note.component';

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
    NotesComponent,
    AccountComponent,
    FaqComponent,
    NoteComponent
  ],
  imports: [
    StoreModule.forRoot({
      contacts: contactsReducer,
      user: userReducer
    }),
    EffectsModule.forRoot([ContactsEffects /*UserEffects*/]),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
