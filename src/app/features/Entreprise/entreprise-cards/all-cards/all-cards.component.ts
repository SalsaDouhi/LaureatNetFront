import { Component, Input } from '@angular/core';
import { Entreprise } from '../../../../shared/interfaces/Entreprise';

@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  styleUrls: ['./all-cards.component.css']
})
export class AllCardsComponent {
  @Input() entreprises: Entreprise[] = []; // Initialize to an empty array
}
