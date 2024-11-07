import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ExcelUploadComponent } from './excel-upload/excel-upload.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateUserComponent } from './create-user/create-user.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    ExcelUploadComponent,
    AllUsersComponent,
    CreateUserComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    ToastModule,
  ]
})
export class AdminModule {}