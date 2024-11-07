import { Component, Input } from '@angular/core';
import { Entreprise } from '../../../../shared/interfaces/Entreprise';
import { Router } from '@angular/router';
import { EntrepriseService } from '../../../../core/services/entrepriseData.service';

@Component({
  selector: '.app-entreprise-table-row',
  templateUrl: './entreprise-table-row.component.html',
  styleUrls: ['./entreprise-table-row.component.css'],
})
export class EntrepriseTableRowComponent {
  @Input() entreprise!: Entreprise;
  entrepriseToDelete?: number;
  entreprises: Entreprise[] = [];
  constructor(
    private router: Router,
    private entrepriseService: EntrepriseService
  ) {}
  getEntreprises(): void {
    this.entrepriseService.getAllEntreprises().subscribe((entreprises) => {
      this.entreprises = entreprises;
    });
  }

  // Rediriger vers le chemin update/{id} lors de la mise à jour d'une entreprise
  updateEntreprise(id: number | undefined): void {
    if (id) {
      this.router.navigate(['entreprise/update', id]); // Assurez-vous que this.router est injecté correctement
    }
  }

  // Rediriger vers le chemin details/{id} pour afficher les détails d'une entreprise
  showDetails(id: number | undefined): void {
    if (id) {
      this.router.navigate(['entreprise/details', id]);
    }
  }
  confirmDelete(id: number | undefined): void {
    if (
      confirm(
        'Êtes-vous sûr de vouloir supprimer cette entreprise ? Cette action est irréversible.'
      )
    ) {
      this.router.navigate(['/entreprise']);
      this.deleteEntreprise(id);
    }
  }

  // Supprimer une entreprise
  deleteEntreprise(id: number | undefined): void {
    if (id) {
      // Appeler le service pour supprimer l'entreprise
      this.entrepriseService.deleteEntrepriseById(id).subscribe(() => {
        // Après la suppression, mettre à jour la liste des entreprises
        this.getEntreprises();
        this.router.navigate(['/entreprise']);
      });
    }
  }

  getLogo(logo: string) {
    if (!logo || logo == '') return 'assets/images/no_logo.png';

    return 'http://localhost:8080/api/v1/files/' + logo;
  }
}
