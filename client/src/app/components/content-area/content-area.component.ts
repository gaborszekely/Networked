import { Component, OnInit } from "@angular/core";
import { fadeAnimation } from "../../animations/fade-animation";

@Component({
  selector: "app-content-area",
  templateUrl: "./content-area.component.html",
  styleUrls: ["./content-area.component.scss"],
  animations: [fadeAnimation]
})
export class ContentAreaComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
