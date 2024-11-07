import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription, SubscriptionRequest } from '../../shared/interfaces/Subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private baseUrl = 'http://localhost:8080/api/v1/subscriptions';

  constructor(private http: HttpClient) { }

  getAllSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.baseUrl);
  }

  getSubscriptionsByUserId(profileId: number): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${this.baseUrl}/all/${profileId}`);
  }

  getSubscribedToListByUserId(profileId: number): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${this.baseUrl}/subscribedTo/${profileId}`);
  }

  getSubscriptionById(id: number): Observable<Subscription> {
    return this.http.get<Subscription>(`${this.baseUrl}/${id}`);
  }

  createSubscription(subscriptionRequest: SubscriptionRequest): Observable<Subscription> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    console.log("subscription requeste", subscriptionRequest);
    
    return this.http.post<Subscription>(this.baseUrl, subscriptionRequest, {headers});
  }

  updateSubscription(id: number, Subscription: Subscription): Observable<Subscription> {
    return this.http.put<Subscription>(`${this.baseUrl}/${id}`, Subscription);
  }

  deleteSubscription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
