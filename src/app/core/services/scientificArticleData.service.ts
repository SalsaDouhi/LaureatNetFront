import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScientificArticle } from '../../shared/interfaces/ScientificArticle';
import { ScientificArticleShowDTO } from '../../shared/interfaces/ScientificArticleShowMV';

@Injectable({
  providedIn: 'root'
})
export class ScientificArticleService {
  private baseUrl = 'http://localhost:8080/api/v1/scientificarticle';

  constructor(private http: HttpClient) { }

  getAllScientificArticles(): Observable<ScientificArticle[]> {
    return this.http.get<ScientificArticle[]>(`${this.baseUrl}/all`);
  }

  getScientificArticleById(id: number): Observable<ScientificArticle> {
    return this.http.get<ScientificArticle>(`${this.baseUrl}/${id}`);
  }

  createScientificArticle(article: ScientificArticle): Observable<ScientificArticle> {
    return this.http.post<ScientificArticle>(`${this.baseUrl}/create`, article);
  }

  getArticlesByPublisherId(authorId: number): Observable<ScientificArticleShowDTO[]> {
    return this.http.get<ScientificArticleShowDTO[]>(`${this.baseUrl}/by-author/${authorId}`);
  }
  updateScientificArticle(id: number, article: ScientificArticle): Observable<ScientificArticle> {
    return this.http.put<ScientificArticle>(`${this.baseUrl}/${id}`, article);
  }

  deleteScientificArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
