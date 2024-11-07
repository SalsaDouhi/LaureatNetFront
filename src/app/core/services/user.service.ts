import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/interfaces/api-response';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = 'http://localhost:8080/api/v1/accounts';

  constructor(
    private http: HttpClient,
    private profileService: ProfileService
  ) {}

  // get a list of all user friends
  getFriends(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(
      this.baseUrl.concat('/friends/' + this.profileService.getCurrentUserId())
    );
  }

  // get the conversation id between two users
  getConversationIdByUser1IdAndUser2Id(
    user1Id: number,
    user2Id: number
  ): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl.concat('/conversation'), {
      params: { user1Id: user1Id, user2Id: user2Id },
    });
  }

  // get the currently logged in user from profile service
  currentUser(): any {
    return this.profileService.fetchCurrentUserDetails();
  }
}
