import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private http: HttpClient) { }

  downloadPdf(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }
}
