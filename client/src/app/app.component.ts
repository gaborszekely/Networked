import { Component, OnInit } from "@angular/core";
import { LoginService } from "./core/services/login.service";
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
  RoutesRecognized
} from "@angular/router";
import { Observable } from "rxjs";
import { map, filter } from "rxjs/operators";

enum PageLoadEnum {
  LOADING = "loading",
  FINISHED = "finished"
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  routerLoadState$: Observable<PageLoadEnum>;
  pageLoadEnum = PageLoadEnum;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.loginService.onPageReload();
    this.activateRouterListenService();
  }

  /**
   * Determines transitional state of router in order to display loading indicator on UI
   */
  private activateRouterListenService() {
    this.routerLoadState$ = this.router.events.pipe(
      filter(
        event =>
          event instanceof NavigationStart || event instanceof NavigationEnd
      ),
      map(event =>
        event instanceof NavigationStart
          ? PageLoadEnum.LOADING
          : PageLoadEnum.FINISHED
      )
    );
  }
}
