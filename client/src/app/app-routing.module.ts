import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthRouteGuard } from "@core/services/auth-route-guard.service";

const routes: Routes = [
  {
    path: "login",
    redirectTo: "user/login",
    pathMatch: "full"
  },
  {
    path: "contacts",
    canActivate: [AuthRouteGuard],
    loadChildren: () =>
      import("./contacts/contacts.module").then(mod => mod.ContactsModule)
  },
  {
    path: "events",
    canActivate: [AuthRouteGuard],
    loadChildren: () =>
      import("./events/events.module").then(mod => mod.EventsModule)
  },
  {
    path: "user",
    loadChildren: () => import("./user/user.module").then(mod => mod.UserModule)
  },
  {
    path: "",
    loadChildren: () => import("./home/home.module").then(mod => mod.HomeModule)
  } // Handles 404 Page Not Found
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes /*, { enableTracing: true } // <-- for debugging, */
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
