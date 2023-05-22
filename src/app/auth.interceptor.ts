import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let newRequest: HttpRequest<unknown>;
    if (request.url.includes('picsum')) {
      newRequest = request;
    } else {
      newRequest = request.clone({
        headers: request.headers.append(
          'Authorization',
          'Bearer ' + this.authService.getToken()
        ),
      });
    }
    return next.handle(newRequest);
  }
}
