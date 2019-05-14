import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Observable } from "rxjs";

import { githubToken } from "../../config/githubToken";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem("access_token");
    if (idToken && req.url.includes("localhost")) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${idToken}`)
      });
      // const cloned = req.clone({
      //   setHeaders: {
      //     Authorization: `Bearer ${idToken}`
      //   }
      // });
      return next.handle(cloned);
    } else if (req.url.includes("github")) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", `token ${githubToken}`)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
