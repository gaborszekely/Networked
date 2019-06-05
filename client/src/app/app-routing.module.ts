import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from "./components/login-page/login-page.component";

const routes: Routes = [
  { path: "login", component: LoginPageComponent },
  {
    path: "contacts",
    loadChildren: () =>
      import("./modules/contacts/contacts.module").then(
        mod => mod.ContactsModule
      )
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
