import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserAccount } from '../../shared/interfaces/UserAccount';
import { UserProfile } from '../../shared/interfaces/UserProfile';
import { jwtDecode } from 'jwt-decode';
import { AccountType } from '../../shared/interfaces/AccountType';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userAccount: UserAccount = {} as UserAccount;
  userprofile: UserProfile = {} as UserProfile;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  private apiUrl = environment.apiBaseUrl + '/auth';

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, {
      email: email,
      password: password,
    });
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, {
      name: name,
      email: email,
      password: password,
    });
  }

  isLoggedIn(): boolean {
    return this.getToken() != null;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('picture');
    localStorage.removeItem('banner');
  }

  getToken(): string | null {
    const token = localStorage.getItem('authToken');
    return token;
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  decodeUserToken() {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    const decodedToken = this.jwtHelper.decodeToken(token);
    if (!decodedToken) return;

    this.userAccount.id = decodedToken.accountId;
    this.userAccount.email = decodedToken.email;
    this.userAccount.accountType = {} as AccountType;
    this.userAccount.accountType.roles = decodedToken.roles.split(',') || [];

    localStorage.setItem('currentUserId', decodedToken.accountId);
  }

  getCurrentUserRoles() {
    this.decodeUserToken();
    return this.userAccount.accountType.roles;
  }

  getCurrentUserId(): number {
    const token = localStorage.getItem('currentUserId');
    return parseInt(token!);
    /*if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded.accountId; // Ensure this is the correct property name
    } catch (error) {
      console.error('Failed to decode token', error);
      return null;
    }*/
  }
}

//sessionStorage.setItem('authToken', "eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOiIxIiwicm9sZXMiOiJBRE1JTiIsInN1YiI6Im1lZEBnbWFpbC5jb20iLCJpYXQiOjE3MTUxNjYxOTUsImV4cCI6MTcxNTI1MjU5NX0.WfudNSJPUxw4NXC0-0DEM6MF-gNkU56MBFVKE4Q_GnY")
