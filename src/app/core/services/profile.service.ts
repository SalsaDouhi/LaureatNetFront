import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserAccount } from '../../shared/interfaces/UserAccount';
import { Profile } from '../../shared/interfaces/Profile';
import { UserProfile } from '../../shared/interfaces/UserProfile';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  userAccount: UserAccount = {} as UserAccount;
  userprofile: Profile = {} as Profile;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  private apiUrl = environment.apiBaseUrl + '/accounts/profiles';
  private apiUrl1 = environment.apiBaseUrl + '/user-profiles';

  getProfile(profileId: string) {
    return this.http.get<Profile>(`${this.apiUrl}/${profileId}`);
  }

  fetchCurrentUserDetails() {
    let currentUserId = localStorage.getItem('currentUserId');
    if (currentUserId) {
      this.getProfile(currentUserId).subscribe({
        next: (profile) => {
          localStorage.setItem(
            'firstName',
            profile.userProfile.firstName.toString()
          );
          localStorage.setItem(
            'lastName',
            profile.userProfile.lastName.toString()
          );
          localStorage.setItem(
            'picture',
            profile.userProfile.picture.toString()
          );
          localStorage.setItem('banner', profile.userProfile.banner.toString());
          localStorage.setItem('email', profile.email.toString());
          this.userprofile = profile;
        },
        error: (error) => {
          console.log(`Error getting profile info: `, error);
        },
      });
    }

    return this.userprofile;
  }

  // ! getters
  getCurrentUserId() {
    if (!localStorage.getItem('currentUserId')) return null;

    return localStorage.getItem('currentUserId');
  }

  getCurrentUserEmail() {
    if (localStorage.getItem('email')) return localStorage.getItem('email');

    return null;
  }

  getCurrentUserFirstName() {
    if (localStorage.getItem('firstName'))
      return localStorage.getItem('firstName');

    return null;
  }

  getCurrentUserLastName() {
    if (localStorage.getItem('lastName'))
      return localStorage.getItem('lastName');

    return null;
  }

  getCurrentUserFullName() {
    return (
      localStorage.getItem('firstName') + ' ' + localStorage.getItem('lastName')
    );
  }

  getAllProfiles(userId: number): Observable<Profile[]> {
    const url = `${this.apiUrl}?id=${userId}`;
    console.log('getAllProfiles URL:', url);
    // Note the correct endpoint and query parameter syntax
    return this.http.get<Profile[]>(url).pipe(
      catchError((error) => {
        console.log('Error occurred in getAllProfiles:', error);
        throw error; // re-throw the error to be caught by the caller
      })
    );
  }

  getCurrentUserPicture() {
    if (!localStorage.getItem('picture')) return 'assets/images/no_pfp.png';

    return (
      'http://localhost:8080/api/v1/files/' + localStorage.getItem('picture')
    );
  }

  getCurrentUserBanner() {
    if (!localStorage.getItem('banner'))
      return 'assets/images/no_banner.jpg';

    return (
      'http://localhost:8080/api/v1/files/' + localStorage.getItem('banner')
    );
  }

  getUserProfileById(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl1}/${id}`);
  }

  getUserProfileByUserAccountId(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl1}/user/${id}`);
  }

  // ! updaters
  updateUserProfile(id: number, formData: FormData): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiUrl1}/${id}`, formData);
  }

  updateUserPersonalInfo(
    userId: number,
    formData: FormData
  ): Observable<UserProfile> {
    return this.http.put<UserProfile>(
      `${this.apiUrl1}/personal-info/${userId}`,
      formData
    );
  }

  updateUserNetworking(
    userId: number,
    formData: FormData
  ): Observable<UserProfile> {
    return this.http.put<UserProfile>(
      `${this.apiUrl1}/networking/${userId}`,
      formData
    );
  }

  updateUserPassword(
    userId: number,
    formData: FormData
  ): Observable<UserProfile> {
    return this.http.put<UserProfile>(
      `${this.apiUrl1}/change-password/${userId}`,
      formData
    );
  }

  updateUserPictures(
    userId: number,
    formData: FormData
  ): Observable<UserProfile> {
    return this.http.put<UserProfile>(
      `${this.apiUrl1}/update-pictures/${userId}`,
      formData
    );
  }

  updateUserBio(bio: String): Observable<any> {
    return this.http.put<String>(
      `${this.apiUrl1}/${this.getCurrentUserId()}/bio`,
      bio
    );
  }
}
