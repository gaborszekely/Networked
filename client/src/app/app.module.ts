/* MODULES */
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from "./app-routing.module";
import { UserModule } from "./modules/user/user.module";
import { UiModule } from "./modules/ui/ui.module";

/* COMPONENTS */
import { AppComponent } from "./app.component";
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
  declarations: [AppComponent, LoginPageComponent],
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
    CoreModule,
    UiModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
