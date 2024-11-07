import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TechnologyDataComponent } from './technology-data/technology-data.component';

const routes: Routes = [
  { path: '', component: TechnologyDataComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class TechnologyDataRoutingModule {}
