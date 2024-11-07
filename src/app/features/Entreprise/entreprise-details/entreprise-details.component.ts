import { Component, Input, OnInit, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrepriseService } from '../../../core/services/entrepriseData.service';
import { Entreprise } from '../../../shared/interfaces/Entreprise';

@Component({
  selector: 'app-enterprise-details',
  templateUrl: './entreprise-details.component.html',
  styleUrls: ['./entreprise-details.component.css'],
})
export class EntrepriseDetailsComponent implements OnInit {
  x = 0;
  y = 0;
  entreprise!: Entreprise; //
  // ghoch = '../../../../assets/images/banner1.jpg';

  constructor(
    private route: ActivatedRoute,

    private entrepriseService: EntrepriseService
  ) {}

  ngOnInit(): void {
    this.getEntreprise();
  }

  getEntreprise(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.entrepriseService.getEntrepriseById(id).subscribe({
        next: (entreprise) => {
          this.entreprise = entreprise;
          this.x = entreprise.localisationX;
          this.y = entreprise.localisationY;

          console.log(this.entreprise);
        },
        error: (error) => console.log(error),
      });
      this.x = 34.659849;
      this.y = -1.900775;
    }
  }

  getLogo() {
    if (!this.entreprise || !this.entreprise.logo || this.entreprise.logo == '')
      return 'assets/images/no_logo.png';

    return 'http://localhost:8080/api/v1/files/' + this.entreprise.logo;
  }
}
