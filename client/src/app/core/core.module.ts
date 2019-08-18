import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store/app.state";
import { AuthInterceptor } from "./interceptors/CustomHttpInterceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { EffectsModule } from "@ngrx/effects";
import { AuthRouteGuard } from "./services/auth-route-guard.service";
import { LoginService } from "./services/login.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthRouteGuard,
    LoginService
  ],
  exports: []
})
export class CoreModule {}
