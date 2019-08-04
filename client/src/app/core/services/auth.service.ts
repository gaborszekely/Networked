import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor() {}

  getAccessToken(): string {
    return localStorage.getItem('access_token');
  }
}
