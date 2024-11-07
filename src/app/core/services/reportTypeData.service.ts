import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ReportType } from '../../shared/interfaces/ReportType';

@Injectable({
  providedIn: 'root',
})
export class ReportTypeService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiBaseUrl + '/report-types';

  getReportTypes() {
    return this.http.get<ReportType[]>(`${this.apiUrl}`);
  }
}
