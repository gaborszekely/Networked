import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { githubToken } from '../../../config/githubToken';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const idToken = this.authService.getAccessToken();

    const modifiedRequest = this.getModifiedHeader(req, idToken);

    return next.handle(modifiedRequest);
  }

  private getModifiedHeader(req: HttpRequest<any>, token: string = '') {
    let cloned: HttpRequest<any> = req.clone();

    if (req.url.includes('localhost')) {
      cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      /* const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${idToken}`
        }
      }); */
    } else if (req.url.includes('github')) {
      cloned = req.clone({
        headers: req.headers.set('Authorization', `token ${githubToken}`)
      });
    }

    return cloned;
  }
}
