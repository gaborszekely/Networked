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
