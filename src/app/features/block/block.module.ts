import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BlockRoutingModule } from './block-routing.module';
import { BlockListComponent } from './block-list/block-list.component';
import { PasswordModalComponent } from './password-modal/password-modal.component';
import { ErrorHandlerInterceptor } from '../../core/interceptors/error-handler.interceptor';

@NgModule({
  declarations: [
    BlockListComponent,
    PasswordModalComponent,
  ],

  providers: [
    MessageService,
    ErrorHandlerInterceptor
  ],

  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    BlockRoutingModule
  ],
})
export class BlockModule { }
