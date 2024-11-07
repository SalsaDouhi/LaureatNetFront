import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExcelUploadComponent } from './excel-upload/excel-upload.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
  // { path: '', component: AdminDashboardComponent, pathMatch: 'full' }, // ? example go to dashboard
  { path: 'users', component: AllUsersComponent }, // ? example go to users list
  { path: 'uploadExcel', component: ExcelUploadComponent }, 
  { path: 'create-user', component: CreateUserComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
