import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectionListComponent } from './connection-list/connection-list.component';
import { ConnectionRequestsComponent } from './connection-requests/connection-requests.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list/:id', component: ConnectionListComponent },
  { path: 'requests', component: ConnectionRequestsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectionRoutingModule { }
