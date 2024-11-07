import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class HttpHoldService {
  public holding:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
}
