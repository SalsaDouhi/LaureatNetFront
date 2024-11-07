// src/app/core/services/entreprise.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entreprise } from '../../shared/interfaces/Entreprise';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  private baseUrl = 'http://localhost:8080/api/v1/entreprises';

  constructor(private http: HttpClient) { }

  getAllEntreprises(): Observable<Entreprise[]> {
    return this.http.get<Entreprise[]>(this.baseUrl);
  }

  getEntrepriseById(id: number): Observable<Entreprise> {
    return this.http.get<Entreprise>(`${this.baseUrl}/${id}`);
  }

   createEntreprise(formData: FormData): Observable<Entreprise> {
    return this.http.post<Entreprise>(`${this.baseUrl}`,formData);
  }
  /*updateEntreprise(id: number, entreprise: Entreprise): Observable<Entreprise> {
    return this.http.put<Entreprise>(`${this.baseUrl}/${id}`, entreprise);
  }*/
  updateEntreprise(id: number, formData: FormData): Observable<Entreprise> {
    return this.http.put<Entreprise>(`${this.baseUrl}/${id}`, formData);
  }
  

  deleteEntrepriseById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
