import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { InternshipOffer } from "../../shared/interfaces/InternshipOffer";
import { Injectable } from "@angular/core";
import { InternshipOfferCreationVM } from "../../shared/interfaces/InternshipOfferCreationVM";
import { Post } from "../../shared/interfaces/Post";

@Injectable({
    providedIn: 'root'
})
  
export class InternshipOfferDataService {
    private baseURL: string = 'http://localhost:8080/api/v1/internship-offers';
  
    constructor(private http: HttpClient) { }
  
    getAllInternshipOffers(): Observable<Post[]> {
    	return this.http.get<Post[]>(`${this.baseURL}`);
    }
    getAllInternshipOffersSorted(userId: number, pageNumber: number): Observable<Post[]> {
        let params = new HttpParams().set('userId', userId).set('page', pageNumber);
        return this.http.get<Post[]>(this.baseURL, { params: params });
    }
    getInternshipOfferById(id: number): Observable<InternshipOffer> {
    	return this.http.get<InternshipOffer>(`${this.baseURL}/${id}`);
    }
  
    createInternshipOffer(internshipOffer: FormData): Observable<HttpResponse<InternshipOffer>> {
      	return this.http.post<InternshipOffer>(`${this.baseURL}`, internshipOffer, { observe: 'response' });
    }
  
    updateInternshipOffer(id: number, internshipOffer: InternshipOffer): Observable<HttpResponse<InternshipOffer>> {
      	return this.http.put<InternshipOffer>(`${this.baseURL}/${id}`, internshipOffer, { observe: 'response' });
    }
  
    deleteInternshipOffer(id: number): Observable<any> {
      	return this.http.delete(`${this.baseURL}/${id}`);
    }
  }