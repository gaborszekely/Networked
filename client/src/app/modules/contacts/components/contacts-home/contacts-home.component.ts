import { Component, OnInit } from "@angular/core";
import { fadeAnimation } from "src/app/core/animations/fade-animation";

@Component({
  selector: "app-contacts-home",
  templateUrl: "./contacts-home.component.html",
  styleUrls: ["./contacts-home.component.scss"],
  animations: [fadeAnimation]
})
export class ContactsHomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
