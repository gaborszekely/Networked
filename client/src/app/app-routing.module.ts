import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from "./components/login-page/login-page.component";

const routes: Routes = [
  { path: "login", component: LoginPageComponent },
  {
    path: "contacts",
    loadChildren: "./modules/contacts/contacts.module#ContactsModule"
    // loadChildren: () =>
    //   import("./modules/contacts/contacts.module").then(
    //     mod => mod.ContactsModule
    //   )
  },
  {
    path: "events",
    loadChildren: "./modules/events/events.module#EventsModule"
    // loadChildren: () =>
    //   import("./modules/events/events.module").then(mod => mod.EventsModule)
  }
  // { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes /* { enableTracing: true } // <-- for debugging, */
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
