import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TechnologyDataComponent } from './technology-data/technology-data.component';
import { TechnologyDataRoutingModule } from './technology-data-routing.module';
import { TechnologyEditModalComponent } from './technology-edit-modal/technology-edit-modal.component';

@NgModule({
  imports: [CommonModule, SharedModule, TechnologyDataRoutingModule],
  declarations: [TechnologyDataComponent, TechnologyEditModalComponent],
})
export class TechnologyDataModule {}
