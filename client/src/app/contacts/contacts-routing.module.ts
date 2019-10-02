import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ConnectionsComponent } from "@app/contacts/components/connections/connections.component";
import { NotesComponent } from "./components/notes/notes.component";
import { ContactComponent } from "./components/contact/contact.component";
import { AddContactComponent } from "./components/add-contact/add-contact.component";
import { ContactsHomeComponent } from "./components/contacts-home/contacts-home.component";

const routes: Routes = [
  {
    path: "",
    component: ContactsHomeComponent,
    children: [
      { path: "list", component: ConnectionsComponent },
      { path: "list/:github", component: ContactComponent },
      { path: "add", component: AddContactComponent }
    ]
  },
  { path: "notes", component: NotesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule {}
