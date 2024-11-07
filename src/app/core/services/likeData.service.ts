import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Like } from '../../shared/interfaces/Like';

@Injectable({
  providedIn: 'root'
})
export class LikeDataService {
  private baseUrl = 'http://localhost:8080/api/v1/likes';

  constructor(private http: HttpClient) { }

  createLike(like: FormData): Observable<Like> {
    return this.http.post<Like>(this.baseUrl, like);
  }

  getLikeById(id: number): Observable<Like> {
    return this.http.get<Like>(`${this.baseUrl}/${id}`);
  }

  getAllLikes(): Observable<Like[]> {
    return this.http.get<Like[]>(this.baseUrl);
  }

  deleteLike(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  removeLike(like: FormData): Observable<void> {
    return this.http.delete<void>(this.baseUrl, {body:like});
  }
}
