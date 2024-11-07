import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntrepriseRoutingModule } from './entreprise-routing.module';

// Importez les composants nécessaires
import { CreateEntrepriseComponent } from './entreprise-create/create-entreprise.component';
import { UpdateEntrepriseComponent } from './entreprise-update/update-entreprise.component';
import { ListEntrepriseComponent } from './entreprise-table/list-entreprise.component';
import { EntrepriseCardsComponent } from './entreprise-cards/entreprise-cards.component';
import { BaseCardComponent } from './entreprise-cards/base-card/base-card.component';
import { AllCardsComponent } from './entreprise-cards/all-cards/all-cards.component';
import { mapLocation } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { EntrepriseTableRowComponent } from './entreprise-table/entreprise-table-row/entreprise-table-row.component';
import { EntrepriseDetailsComponent } from './entreprise-details/entreprise-details.component';


@NgModule({
  declarations: [
    CreateEntrepriseComponent,
    UpdateEntrepriseComponent,
    ListEntrepriseComponent,
    EntrepriseCardsComponent ,
  
    AllCardsComponent ,
    BaseCardComponent,
    mapLocation,
    EntrepriseTableRowComponent,
    EntrepriseDetailsComponent,

   
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EntrepriseRoutingModule ,
    GoogleMapsModule
  ]
})
export class EntrepriseModule { }
