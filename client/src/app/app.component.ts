import { Component, OnInit } from "@angular/core";
import { LoginService } from "./core/services/login.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "client";
  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.onPageReload();
  }
}
