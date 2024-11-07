import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobOffer } from '../../shared/interfaces/JobOffer';
import { JobOfferCreationVM } from '../../shared/interfaces/JobOfferCreationVM';
import { Post } from '../../shared/interfaces/Post';

@Injectable({
  providedIn: 'root'
})
export class JobOfferDataService {
  private baseURL: string = 'http://localhost:8080/api/v1/job-offers';

  constructor(private http: HttpClient) { }

  getAllJobOffers(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseURL}`);
  }
  getAllJobOffersSorted(userId: number, pageNumber: number): Observable<Post[]> {
    let params = new HttpParams().set('userId', userId).set('page', pageNumber);
    return this.http.get<Post[]>(this.baseURL, { params: params });
  }
  getJobOfferById(id: number): Observable<JobOffer> {
    return this.http.get<JobOffer>(`${this.baseURL}/${id}`);
  }

  createJobOffer(jobOffer: FormData): Observable<HttpResponse<JobOffer>> {
    return this.http.post<JobOffer>(`${this.baseURL}`, jobOffer, { observe: 'response' });
  }

  updateJobOffer(id: number, jobOffer: JobOffer): Observable<HttpResponse<JobOffer>> {
    return this.http.put<JobOffer>(`${this.baseURL}/${id}`, jobOffer, { observe: 'response' });
  }

  deleteJobOffer(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
