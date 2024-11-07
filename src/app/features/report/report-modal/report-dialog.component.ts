import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportType } from './../../../shared/interfaces/ReportType';
import { ReportService } from './../../../core/services/reportData.service';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
})

export class ReportDialogComponent {
  selectedReportTypeId: number | null = null;
  currentUserId: number = 0;
  message: string = 'notSendYet';

  constructor(
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    public reportService: ReportService,
    public authService: AuthService,
    public route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: { reportTypes: ReportType[], reportedId: number }
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const selectedReportType = this.data.reportTypes.find(section => section.id === this.selectedReportTypeId);
    if (selectedReportType) {
      this.report(selectedReportType.id);
    }
  }

  report(typeId: number) {
    this.currentUserId = this.authService.getCurrentUserId() ?? 0;
    this.reportService.createReport({
      reportTypeId: typeId,
      reporterId: this.currentUserId,
      reportedId: this.data.reportedId,
    }).subscribe(
      (response) => {
        if (response) {
          this.message = 'sent';  // Change 'success' to 'sent'
          console.log('Report created!', response);
        }
      },
      (error: string) => {
        console.log('Report creation failed!', error);
      }
    );
  }
}
