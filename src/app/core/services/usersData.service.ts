// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAccountMV } from '../../shared/interfaces/UserAccountMV';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl1 = 'http://localhost:8080/api/v1/accounts';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserAccountMV[]> {
    return this.http.get<UserAccountMV[]>(`${this.apiUrl1}/users`);
  }
  createUserAccounts(users: UserAccountMV[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl1}/import`, users);
  }
  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl1}/${userId}`);
  }
}
