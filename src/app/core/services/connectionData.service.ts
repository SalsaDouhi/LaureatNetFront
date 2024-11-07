import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Connection, ConnectionRequest } from '../../shared/interfaces/Connection';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private baseUrl = environment.apiBaseUrl+'/connections';

  constructor(private http: HttpClient) { }

  getAllConnectionsById(id: number): Observable<Connection[]> {
    return this.http.get<Connection[]>(`${this.baseUrl}/all/${id}`);    
  }

  getAcceptedConnections(id: number): Observable<Connection[]> {
    return this.http.get<Connection[]>(`${this.baseUrl}/accepted/${id}`);    
  }

  getPendingConnectionsByReceiverId(id: number): Observable<Connection[]> {
    return this.http.get<Connection[]>(`${this.baseUrl}/pending/received/${id}`);    
  }

  getPendingConnectionsBySenderId(id: number): Observable<Connection[]> {
    return this.http.get<Connection[]>(`${this.baseUrl}/pending/sent/${id}`);    
  }

  getConnectionById(id: number): Observable<Connection> {
    return this.http.get<Connection>(`${this.baseUrl}/${id}`);
  }
  
  createConnection(connectionRequest: ConnectionRequest): Observable<Connection> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    console.log("connection requeste", connectionRequest);
    
    return this.http.post<Connection>(this.baseUrl, connectionRequest, { headers });
  }
  
  updateConnection(id: number, isAccepted: Boolean): Observable<Connection> {
    return this.http.put<Connection>(`${this.baseUrl}/${id}`, isAccepted);
  }

  deleteConnection(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
