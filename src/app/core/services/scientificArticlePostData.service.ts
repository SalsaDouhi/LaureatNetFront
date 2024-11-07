import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScientificArticlePost } from '../../shared/interfaces/ScientificArticlePost';
import { Post } from '../../shared/interfaces/Post';

@Injectable({
  providedIn: 'root'
})
export class ScientificArticlePostService {
  private baseUrl = 'http://localhost:8080/api/v1/scientific-article-posts';

  constructor(private http: HttpClient) { }

  getAllScientificArticlePosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}`);
  }
  getAllScientificArticlePostsSorted(userId: number, pageNumber: number): Observable<Post[]> {
    let params = new HttpParams().set('userId', userId).set('page', pageNumber);
    return this.http.get<Post[]>(this.baseUrl, { params: params });
  }
  getScientificArticlePostById(id: number): Observable<ScientificArticlePost> {
    return this.http.get<ScientificArticlePost>(`${this.baseUrl}/${id}`);
  }

  createScientificArticlePost(post: FormData): Observable<ScientificArticlePost> {
    return this.http.post<ScientificArticlePost>(`${this.baseUrl}`, post);
  }
  createScientificArticlePostNewArticle(post: FormData): Observable<ScientificArticlePost> {
    return this.http.post<ScientificArticlePost>(`${this.baseUrl}/new-article`, post);
  }

  updateScientificArticlePost(id: number, post: ScientificArticlePost): Observable<ScientificArticlePost> {
    return this.http.put<ScientificArticlePost>(`${this.baseUrl}/${id}`, post);
  }

  deleteScientificArticlePostById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
