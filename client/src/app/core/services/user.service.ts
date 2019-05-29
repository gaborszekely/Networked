import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/User";
import { Observable } from "rxjs";
import { CoreModule } from "../core.module";

@Injectable({
  providedIn: CoreModule
})
export class UserService {
  baseUrl: string = "http://localhost:3000";

  constructor(private readonly http: HttpClient) {}

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/${id}`);
  }
}
