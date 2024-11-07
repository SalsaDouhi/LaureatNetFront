import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // ? no token required
    if (request.url.endsWith('/login')) {
      return next.handle(request);
    }

    const authToken = this.authService.getToken();

    if (!authToken) {
      console.error(
        'No authentication token available. Redirecting to login...'
      );
      this.router.navigate(['/login']);
      return EMPTY;
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return next.handle(request);
  }
}
