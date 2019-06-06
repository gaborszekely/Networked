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
import { ContactsModule } from "./modules/contacts/contacts.module";
import { CoreModule } from "./core/core.module";
import { UserModule } from "./modules/user/user.module";
import { EventsModule } from "./modules/events/events.module";

/* COMPONENTS */
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SidenavComponent } from "./components/sidenav/sidenav.component";
import { ContentAreaComponent } from "./components/content-area/content-area.component";
import { LoginPageComponent } from "./components/login-page/login-page.component";

/* REDUCERS */
import { contactsReducer } from "./reducers/contacts.reducer";
import { userReducer } from "./reducers/user.reducer";

/* EFFECTS */
import { ContactsEffects } from "./effects/contacts.effects";
import { UserEffects } from "./effects/user.effects";

/* OTHER */
import { AuthInterceptor } from "./core/interceptors/CustomHttpInterceptor";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    ContentAreaComponent,
    LoginPageComponent
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
    ReactiveFormsModule,
    UserModule,
    CoreModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
