import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attachment } from '../../shared/interfaces/Attachment';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {
  private baseUrl = 'http://localhost:8080/api/v1/attachment';

  constructor(private http: HttpClient) { }

  getAllAttachments(): Observable<Attachment[]> {
    return this.http.get<Attachment[]>(`${this.baseUrl}/all`);
  }

  getAttachmentById(id: number): Observable<Attachment> {
    return this.http.get<Attachment>(`${this.baseUrl}/${id}`);
  }

  createAttachment(attachment: Attachment): Observable<Attachment> {
    return this.http.post<Attachment>(`${this.baseUrl}/create`, attachment);
  }

  updateAttachment(id: number, attachment: Attachment): Observable<Attachment> {
    return this.http.put<Attachment>(`${this.baseUrl}/${id}`, attachment);
  }

  deleteAttachment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
