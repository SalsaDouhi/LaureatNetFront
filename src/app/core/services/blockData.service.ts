import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Block, BlockBody } from '../../shared/interfaces/Block';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlockService {
  private baseUrl = environment.apiBaseUrl+'/blocks';

  constructor(
    private http: HttpClient,
  ) { }

  getAllBlocks(): Observable<Block[]> {
    return this.http.get<Block[]>(this.baseUrl);
  }

  getBlocksByUserId(userId: number): Observable<Block[]> {
    return this.http.get<Block[]>(`${this.baseUrl}/${userId}`);
  }

  getBlockById(id: number): Observable<Block> {
    return this.http.get<Block>(`${this.baseUrl}/${id}`);
  }

  createBlock(block: BlockBody): Observable<Block> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    console.log("connection requeste", block);
    
    return this.http.post<Block>(this.baseUrl, block, { headers });
  }

  updateBlock(id: number, Block: Block): Observable<Block> {
    return this.http.put<Block>(`${this.baseUrl}/${id}`, Block);
  }

  deleteBlock(id: number): Observable<void> {
    let errorMessage = '';
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(error => {
          errorMessage = this.handleErrorMessage(error); // Call handleErrorMessage to process error
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  checkPassword(id: number | undefined, password: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/${id}/check-password`, { password });
  }

  private handleErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
      return error.error.message;
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      switch (error.status) {
        case 404:
          return 'Block not found!';
        case 401: // Assuming unauthorized access for unblocking
          return 'You are not authorized to unblock this member!';
        default:
          return 'Unknown error!';
      }
    }
  }
}
