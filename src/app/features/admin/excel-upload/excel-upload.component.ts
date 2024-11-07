import { Component } from '@angular/core';
import { ExcelImportService } from '../../../core/services/excelImportData.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.css'],
})
export class ExcelUploadComponent {
  errorMessage: string | null = null;

  file: File | undefined;
  showSuccessModal = false;

  constructor(
    private excelImportService: ExcelImportService,
    private router: Router
  ) {}

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  uploadFile(): void {
    if (!this.file) {
      this.errorMessage = 'Aucun fichier sélectionné.';
      console.error('Aucun fichier sélectionné.');
      return;
    }

    this.excelImportService
      .importUsersFromExcel(this.file)
      .subscribe((users) => {
        this.excelImportService.createUserAccounts(users).subscribe({
          next: (response) => {
            console.log(response);
            this.showSuccessModal = true;
          },
          error: (error) => {
            console.log(`Error creating new user: `, error);
            this.showSuccessModal = true;
            this.router.navigate(['/admin/users']);
          },
        });
      });
  }
  closeSucces() {
    this.showSuccessModal = false;
    this.router.navigate(['/admin/users']);
  }
}
