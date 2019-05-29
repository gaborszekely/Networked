import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ILoginResponse } from "../interfaces/LoginResponse";
import * as moment from "moment";
import { CoreModule } from "../core.module";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: CoreModule
})
export class LoginService {
  baseUrl: string = "http://localhost:3000";
  constructor(private readonly http: HttpClient) {}

  loginUser(email: string, password: string): Promise<ILoginResponse> {
    return this.http
      .post<ILoginResponse>(
        `${this.baseUrl}/user/login`,
        { email, password },
        httpOptions
      )
      .toPromise();
  }

  logoutUser() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_in");
  }

  setJsonToken(payload: ILoginResponse) {
    const expiresAt = moment().add(payload.expires_in, "second");

    localStorage.setItem("access_token", payload.access_token);
    localStorage.setItem("expires_in", JSON.stringify(expiresAt.valueOf()));
  }

  getJsonToken(): string {
    return localStorage.getItem("access_token");
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  public isLoggedIn() /*: Observable<any>*/ {
    return moment().isBefore(this.getExpiration());
    // const loggedIn: Observable<boolean> = new Observable(observer => {
    //   const { next, error } = observer;
    //   try {
    //     next(moment().isBefore(this.getExpiration()));
    //   } catch (err) {
    //     error(err);
    //   }
    // });
    // return loggedIn;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}
