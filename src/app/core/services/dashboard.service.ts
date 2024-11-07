// src/app/core/services/entreprise.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardDTO } from '../../shared/interfaces/DashboardDTO';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = 'http://localhost:8080/api/v1/dashboard';

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<DashboardDTO> {
    return this.http.get<DashboardDTO>(this.baseUrl);
  }
}
