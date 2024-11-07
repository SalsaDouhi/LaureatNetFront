import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConnectionRoutingModule } from './connection-routing.module';
import { ConnectionListComponent } from './connection-list/connection-list.component';
import { ConnectionRequestsComponent } from './connection-requests/connection-requests.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    ConnectionListComponent,
    ConnectionRequestsComponent
  ],
  
  providers: [
    MessageService
  ],

  imports: [
    CommonModule,
    FormsModule,
    ToastModule,
    ReactiveFormsModule,
    ConnectionRoutingModule 
  ]
})
export class ConnectionModule { }
