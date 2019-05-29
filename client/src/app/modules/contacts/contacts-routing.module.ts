import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConnectionsComponent } from "src/app/modules/contacts/components/connections/connections.component";
import { ConnectionComponent } from "./components/connection/connection.component";
import { NotesComponent } from "./components/notes/notes.component";
import { ContactComponent } from "./components/contact/contact.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "contacts",
    pathMatch: "full"
  },
  {
    path: "contacts",
    component: ConnectionsComponent
    // children: [{ path: ":id", component: ContactComponent }]
  },
  { path: "notes", component: NotesComponent },
  {
    path: "contacts/:id",
    component: ContactComponent
    // children: [{ path: ":id", component: ConnectionComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule {}
