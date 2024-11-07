import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Technology } from '../../shared/interfaces/Technology';

@Injectable({
  providedIn: 'root',
})
export class TechnologyDataService {
  private baseURL: string = 'http://localhost:8080/api/v1/technologies';

  constructor(private http: HttpClient) {}

  getAllTechnologies(): Observable<Technology[]> {
    return this.http.get<Technology[]>(`${this.baseURL}`);
  }

  getTechnologyById(id: number): Observable<Technology> {
    return this.http.get<Technology>(`${this.baseURL}/${id}`);
  }

  createTechnology(technology: Technology): Observable<Technology> {
    return this.http.post<Technology>(`${this.baseURL}`, technology);
  }

  updateTechnology(technology: Technology): Observable<Technology> {
    return this.http.put<Technology>(`${this.baseURL}/${technology.id}`, technology);
  }

  deleteTechnology(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
