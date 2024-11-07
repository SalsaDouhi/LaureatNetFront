import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../core/services/reportData.service';
import { ReportList } from '../../../shared/interfaces/Report';
import { Connection } from '../../../shared/interfaces/Connection';

@Component({
    selector: 'app-report-list',
    templateUrl: './report-list.component.html',
})

export class ReportListComponent implements OnInit {
    reports: ReportList[] = [];
    filteredConnections: Connection[] = [];
    searchTerm: string = '';
    currentUserId: number = 0;

    constructor(
        private reportService: ReportService,
    ) { }

    ngOnInit(): void {
        this.getReports();
    }

    getReports(): void {
        this.reportService.getReports()
            .subscribe(reports => {
                this.reports = reports;
                console.log('reports received', reports);
            });
    }

}