import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConnectionBtnComponent } from '../features/connection/connection-btn/connection-btn.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ModalService } from '../core/services/model.service';
import { PendingBtnComponent } from '../features/connection/pending-btn/pending-btn.component';
import { BlockBtnComponent } from '../features/block/block-btn/block-btn.component';
import { BetterDatePipe } from './pipes/better-date.pipe';
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { SubscriptionBtnComponent } from '../features/subscription/subscription-btn/subscription-btn.component';
import { UnsubscriptionBtnComponent } from '../features/subscription/Unsubscription-btn/unsubscription-btn.component';
import { ReportBtnComponent } from '../features/report/report-btn/report-btn.component';
import { NewlinesPipe } from './pipes/newlines.pipe';

@NgModule({
  declarations: [
    ConnectionBtnComponent,
    ConfirmationDialogComponent,
    PendingBtnComponent,
    BlockBtnComponent,
    BetterDatePipe,
    DateFormatPipe,
    ConfirmModalComponent,
    SubscriptionBtnComponent,
    UnsubscriptionBtnComponent,
    ReportBtnComponent,
    NewlinesPipe
  ],
  imports: [ 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    ToastModule
  ],
  providers: [
    MessageService,
    ModalService
  ],
  exports: [
    FormsModule, 
    ReactiveFormsModule, 
    PendingBtnComponent,
    ConnectionBtnComponent,
    BlockBtnComponent,
    BetterDatePipe,
    DateFormatPipe,
    SubscriptionBtnComponent,
    UnsubscriptionBtnComponent,
    ReportBtnComponent,
    NewlinesPipe
  ],
})

export class SharedModule {}
