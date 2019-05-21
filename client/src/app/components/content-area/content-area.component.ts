import { Component, OnInit } from "@angular/core";
import { fadeAnimation } from "../../animations/fade-animation";
import { ContactServiceService } from "src/app/services/contact-service.service";
import { ContactStoreService } from "src/app/services/contact-store.service";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Contact } from "../../models/Contact";
import { AppState } from "./../../app.state";

@Component({
  selector: "app-content-area",
  templateUrl: "./content-area.component.html",
  styleUrls: ["./content-area.component.scss"],
  animations: [fadeAnimation]
})
export class ContentAreaComponent implements OnInit {
  contacts$: Observable<Contact[]>;

  constructor(
    private contactService: ContactServiceService,
    private contactStore: ContactStoreService
  ) {}

  ngOnInit() {
    // this.contactService.getContacts().subscribe(contacts => {
    //   this.contactStore.addContacts(contacts);
    // });
  }
}
