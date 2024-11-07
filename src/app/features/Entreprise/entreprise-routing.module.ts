import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEntrepriseComponent } from './entreprise-create/create-entreprise.component';
import { UpdateEntrepriseComponent } from './entreprise-update/update-entreprise.component';
import { ListEntrepriseComponent } from './entreprise-table/list-entreprise.component';
import { EntrepriseCardsComponent } from './entreprise-cards/entreprise-cards.component';
import { mapLocation } from './map/map.component';
import { EntrepriseDetailsComponent } from './entreprise-details/entreprise-details.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ListEntrepriseComponent },
  { path: 'create', component: CreateEntrepriseComponent },
  { path: 'update/:id', component: UpdateEntrepriseComponent },

  { path: 'cards', component: EntrepriseCardsComponent },
  { path: 'map', component: mapLocation }, 
   { path: 'details/:id', component: EntrepriseDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrepriseRoutingModule { }
