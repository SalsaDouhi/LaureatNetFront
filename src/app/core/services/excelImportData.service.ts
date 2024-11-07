import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAccountMV } from '../../shared/interfaces/UserAccountMV';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelImportService {
  constructor(private http: HttpClient) {}

  importUsersFromExcel(file: File): Observable<UserAccountMV[]> {
    return new Observable((observer) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (event: any) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const users: UserAccountMV[] = [];
        jsonData.slice(1).forEach((row: any) => {
          const [
            email,
            firstName,
            lastName,
            birthDate,
            gender,
            role,
            currentGrade,
            major,
          ] = row;
          const newUser: UserAccountMV = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            birthDate: new Date(birthDate).toISOString().slice(0, 10),
            gender: gender === 'M' ? true : false,
            role: role,
            currentGrade: currentGrade,
            major: major,
          } as UserAccountMV;
          console.log(newUser);
          users.push(newUser);
        });
        observer.next(users);
        observer.complete();
      };
      fileReader.onerror = (error) => {
        observer.error(error);
      };
    });
  }

  createUserAccounts(users: UserAccountMV[]): Observable<any> {
    return this.http.post<any>(
      'http://localhost:8080/api/v1/accounts/import',
      users
    );
  }
}
