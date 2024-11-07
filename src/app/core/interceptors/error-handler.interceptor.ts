import { Observable, throwError } from 'rxjs';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 401) {
          // ? (401 Unauthorized) this should be sent from the api in case of: non valid token
          return this.handleAuthError();
        } else if (error.status === 403) {
          // ? (403 Forbidden) this should be sent from the api in case of: insufficient credentials (roles)
          return this.handleForbiddenError();
        }
        return throwError(error);
      })
    );
  }

  private handleAuthError(): Observable<HttpEvent<any>> {
    console.error('Authentication error handled');
    return throwError('Authentication error');
  }

  private handleForbiddenError(): Observable<HttpEvent<any>> {
    console.error('Access forbidden error handled');
    return throwError(
      'Access forbidden: You do not have permission to access this resource.'
    );
  }
  
}
