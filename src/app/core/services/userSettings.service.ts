import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSettings } from '../../shared/interfaces/UserSettings';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  private apiUrl = environment.apiBaseUrl + '/user-settings';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserSettings(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/${this.authService.getCurrentUserId()}`
    );
  }

  updateUserSettings(
    userId: number,
    userSettings: UserSettings
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}`, userSettings);
  }
}
