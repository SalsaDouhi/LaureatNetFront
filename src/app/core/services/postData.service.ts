import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../shared/interfaces/Post';
import { PostCreationVM } from '../../shared/interfaces/PostCreationVM';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {
  private baseURL: string = 'http://localhost:8080/api/v1/posts';

  constructor(private http: HttpClient) { }


  getAllPostsSorted(userId: number, pageNumber: number): Observable<Post[]> {
    let params = new HttpParams().set('userId', userId).set('page', pageNumber);
    return this.http.get<Post[]>(this.baseURL, { params: params });
  }
  getAllPosts(): Observable<Post[]> {
    //return this.http.get<Array<any>>(`${this.baseURL}`);
    return this.http.get<Post[]>(`${this.baseURL}`);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseURL}/${id}`);
  }

  createPost(formData: FormData): Observable<HttpResponse<Post>> {
    return this.http.post<Post>(`${this.baseURL}`, formData, { observe: 'response' });
  }

  updatePost(id: number, post: Post): Observable<HttpResponse<Post>> {
    return this.http.put<Post>(`${this.baseURL}/${id}`, post, { observe: 'response' });
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
