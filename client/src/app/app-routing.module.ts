import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddContactComponent } from "./components/add-contact/add-contact.component";
import { ConnectionsComponent } from "./components/connections/connections.component";
import { ContactComponent } from "./components/contact/contact.component";
import { NotesComponent } from "./components/notes/notes.component";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { AccountComponent } from "./components/account/account.component";
import { FaqComponent } from "./components/faq/faq.component";

const routes: Routes = [
  { path: "add", component: AddContactComponent },
  { path: "contacts", component: ConnectionsComponent },
  { path: "contacts/:id", component: ContactComponent },
  { path: "notes", component: NotesComponent },
  { path: "login", component: LoginPageComponent },
  { path: "account", component: AccountComponent },
  { path: "faq", component: FaqComponent }
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
