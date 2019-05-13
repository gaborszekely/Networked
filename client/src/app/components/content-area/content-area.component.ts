import { Component, OnInit } from "@angular/core";
import { fadeAnimation } from "../../animations/fade-animation";
import { ContactServiceService } from "src/app/services/contact-service.service";
import { ContactStoreService } from "src/app/services/contact-store.service";

@Component({
  selector: "app-content-area",
  templateUrl: "./content-area.component.html",
  styleUrls: ["./content-area.component.scss"],
  animations: [fadeAnimation]
})
export class ContentAreaComponent implements OnInit {
  constructor(
    private contactService: ContactServiceService,
    private contactStore: ContactStoreService
  ) {}

  ngOnInit() {
    this.contactService.getContacts().subscribe(contacts => {
      this.contactStore.addContacts(contacts);
    });
  }
}
