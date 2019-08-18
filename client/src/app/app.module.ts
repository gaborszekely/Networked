/* MODULES */
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClarityModule } from "@clr/angular";
// import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
// import { EffectsModule } from "@ngrx/effects";
import { environment } from "../environments/environment";
import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from "./app-routing.module";
import { UiModule } from "./ui/ui.module";
import { HomeModule } from "./home/home.module";

/* COMPONENTS */
import { AppComponent } from "./app.component";

/* NGRX */
// import { reducers } from "./core/store/app.state";
// import { ContactsEffects } from "./core/store/effects/contacts.effects";
// import { UserEffects } from "./core/store/effects/user.effects";

/* OTHER */
// import { AuthInterceptor } from "./core/interceptors/CustomHttpInterceptor";
import { StoreRouterConnectingModule } from "@ngrx/router-store";

@NgModule({
  declarations: [AppComponent],
  imports: [
    // StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    // EffectsModule.forRoot([ContactsEffects /*UserEffects*/]),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    UiModule
  ],
  // providers: [
  //   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  // ],
  bootstrap: [AppComponent]
})
export class AppModule {}
