import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { sectionItemDTO } from '../../shared/interfaces/SectionItem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SectionsService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiBaseUrl + '/section-items';

  // getSections(profileId: number) {
  //   return this.http.get<SectionType[]>(`${this.apiUrl}`);
  // }

  createSectionItem(
    sectionItemDTO: sectionItemDTO
  ): Observable<sectionItemDTO> {
    return this.http.post<sectionItemDTO>(`${this.apiUrl}`, sectionItemDTO);
  }

  updateSectionItem(
    sectionItemDTO: sectionItemDTO
  ): Observable<sectionItemDTO> {
    return this.http.put<sectionItemDTO>(
      `${this.apiUrl}/${sectionItemDTO.id}`,
      sectionItemDTO
    );
  }

  deleteSectionItem(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
