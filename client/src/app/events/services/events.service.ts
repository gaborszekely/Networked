import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { IEvent } from "../store/reducers/events.reducer";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable()
export class EventsService {
  baseUrl = "http://localhost:3000/events";
  constructor(private http: HttpClient) {}

  loadEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this.baseUrl);
  }

  loadEvent(id: string): Observable<IEvent> {
    return this.http.get<IEvent>(`${this.baseUrl}/${id}`);
  }

  createEvent(event: IEvent): Observable<IEvent> {
    return this.http.post<IEvent>(this.baseUrl, event, httpOptions);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateEvent(id: string, updatedBody: any): Observable<IEvent> {
    return this.http.put<IEvent>(
      `${this.baseUrl}/${id}`,
      updatedBody,
      httpOptions
    );
  }
}
