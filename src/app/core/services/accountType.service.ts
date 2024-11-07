import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attachment } from '../../shared/interfaces/Attachment';
import { AccountType } from '../../shared/interfaces/AccountType';

@Injectable({
  providedIn: 'root',
})
export class AccountTypeService {
  private baseUrl = 'http://localhost:8080/api/v1/account-types';

  constructor(private http: HttpClient) {}

  getAllAccountTypes(): Observable<AccountType[]> {
    return this.http.get<AccountType[]>(`${this.baseUrl}`);
  }
}
