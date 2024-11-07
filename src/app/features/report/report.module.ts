import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MatDialogModule } from '@angular/material/dialog';

import { ReportTypeService } from '../../core/services/reportTypeData.service';
import { ReportRoutingModule } from './report-routing.module';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportDialogComponent } from './report-modal/report-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    MatDialogModule,
    ReportRoutingModule,
  ],

  declarations: [ReportDialogComponent, ReportListComponent],

  providers: [MessageService, ReportTypeService],
})
export class ReportModule {}
