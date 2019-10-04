import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";

@Component({
  selector: "app-application-board",
  templateUrl: "./application-board.component.html",
  styleUrls: ["./application-board.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationBoardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}


const Application = {
  company: "Google",
  title: "Software Engineer",
  type: "full-time",
  description: "Description",
  link: "google.com/apply/1445325",
  status: "applied",
  connections: ["Rochelle"],
  contact: {},
  interviews: [{ date: "11-12-19-10am", location: "xxx", notes: "My notes" }],
  offer: {
    amount: 122000,
    notes: "Good benefits"
  }
};
