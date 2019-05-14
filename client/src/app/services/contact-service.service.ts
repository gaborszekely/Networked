import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Contact } from "../models/Contact";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

const githubOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class ContactServiceService {
  clientEndpoint: string = "http://localhost:3000";

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.clientEndpoint}/contacts`);
  }

  getContact(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.clientEndpoint}/contacts/${id}`);
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(
      `${this.clientEndpoint}/contacts`,
      contact,
      httpOptions
    );
  }

  updateContact(id: string, contact: any): Observable<Contact> {
    return this.http.put<Contact>(
      `${this.clientEndpoint}/contacts/${id}`,
      contact,
      httpOptions
    );
  }

  deleteContact(id: string): Observable<any> {
    return this.http.delete<any>(`${this.clientEndpoint}/contacts/${id}`);
  }

  getGithub(user: string): Promise<any> {
    return this.http
      .get<any>(`https://api.github.com/users/${user}`, githubOptions)
      .toPromise();
  }
}
