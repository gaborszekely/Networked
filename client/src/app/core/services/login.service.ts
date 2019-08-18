import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ILoginResponse } from "../interfaces/LoginResponse";
import * as moment from "moment";
import { CoreModule } from "../core.module";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/core/store/app.state";
import * as UserActions from "../store/actions/user.actions";

enum LocalStorageKeys {
  ACCESS_TOKEN = "access_token",
  EXPIRES_IN = "expires_in"
}

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
  constructor(
    private http: HttpClient,
    private readonly store: Store<AppState>
  ) {}

  loginUser(email: string, password: string): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(
      `${this.baseUrl}/user/login`,
      { email, password },
      httpOptions
    );
  }

  logoutUser() {
    localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(LocalStorageKeys.EXPIRES_IN);
  }

  setJsonToken(payload: ILoginResponse): void {
    const expiresAt = moment().add(payload.expires_in, "second");
    localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, payload.access_token);
    localStorage.setItem(
      LocalStorageKeys.EXPIRES_IN,
      JSON.stringify(expiresAt.valueOf())
    );
  }

  getJsonToken(): string {
    return localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
  }

  getExpiration() {
    const expiration = localStorage.getItem(LocalStorageKeys.EXPIRES_IN);
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  loginTokenNotExpired(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(): boolean {
    return !this.loginTokenNotExpired();
  }

  onPageReload(): void {
    if (this.loginTokenNotExpired()) {
      this.store.dispatch(new UserActions.LoginSet(true));
    }
  }
}
