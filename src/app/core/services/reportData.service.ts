import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Report, ReportList } from '../../shared/interfaces/Report';

@Injectable({
  providedIn: 'root',
})

export class ReportService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiBaseUrl + '/reports';

  createReport(report: Report) : Observable<Report> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<Report>(this.apiUrl, report, { headers });
  }

  getReports(): Observable<ReportList[]> {
    return this.http.get<ReportList[]>(`${this.apiUrl}`);    
  }
}
