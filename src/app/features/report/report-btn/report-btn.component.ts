import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReportTypeService } from './../../../core/services/reportTypeData.service';
import { MatDialog } from '@angular/material/dialog';
import { ReportType } from './../../../shared/interfaces/ReportType';
import { ReportDialogComponent } from '../report-modal/report-dialog.component';

@Component({
    selector: 'app-report-btn',
    templateUrl: './report-btn.component.html',
})
export class ReportBtnComponent {
    @Input() reportedId: number = 0;
    @Output() connectionRequestSent = new EventEmitter<void>();
    currentUserId: number = 0;
    reportType: ReportType[] = [];

    constructor(
        private reportTypeService: ReportTypeService,
        private dialog: MatDialog
    ) { }

    showReportDialog() {
        this.reportTypeService.getReportTypes().subscribe({
            next: (reportTypes) => {
                this.reportType = reportTypes;
                if (this.reportType.length > 0)
                    this.openSectionsModal();
            },
        });
    }

    openSectionsModal() {
        this.dialog.open(ReportDialogComponent, {
            width: '30%',
            data: {
                reportTypes: this.reportType,
                reportedId: this.reportedId,
            },
        });
    }
}
