import { Component, Input } from '@angular/core';
import { Entreprise } from '../../../../shared/interfaces/Entreprise';
@Component({
  selector: 'app-base-card',
  templateUrl: './base-card.component.html',
  styleUrls: ['./base-card.component.css'],
})
export class BaseCardComponent {
  @Input() entreprise: Entreprise | undefined;

  getLogo() {
    if (!this.entreprise || !this.entreprise.logo || this.entreprise.logo == '')
      return 'assets/images/no_logo.png';

    return 'http://localhost:8080/api/v1/files/' + this.entreprise.logo;
  }
}
