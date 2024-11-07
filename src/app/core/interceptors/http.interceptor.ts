import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { HttpHoldService } from '../services/http-hold.service';
import { Injectable } from '@angular/core';

@Injectable() 
export class BuferringHttpInterceptor implements HttpInterceptor{
  constructor(private httpHoldService :HttpHoldService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.httpHoldService.holding.next(true);
    return next.handle(req).pipe(
      finalize(
        () => {
          this.httpHoldService.holding.next(false);
        }
      )
    )
  }

}
