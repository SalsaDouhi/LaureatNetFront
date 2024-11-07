import { Component, OnInit } from '@angular/core';
import { Entreprise } from '../../../shared/interfaces/Entreprise';
import { EntrepriseService } from '../../../core/services/entrepriseData.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entreprise-cards',
  templateUrl: './entreprise-cards.component.html',
  styleUrls: ['./entreprise-cards.component.css'],
})
export class EntrepriseCardsComponent implements OnInit {
  entreprises: Entreprise[] = []; // Initialize to an empty array
  filteredEnterprises: Entreprise[] = []; // For storing filtered enterprises

  constructor(private entrepriseService: EntrepriseService, private router: Router) { }

  ngOnInit(): void {
    this.loadEntreprises();
  }

  loadEntreprises(): void {
    this.entrepriseService.getAllEntreprises().subscribe(entreprises => {
      this.entreprises = entreprises; // Update the component's data
      this.filteredEnterprises = entreprises; // Initialize the filtered list
    });
  }

  filterEnterprises(searchTerm: string): void {
    this.filteredEnterprises = this.entreprises.filter(entreprise =>
      entreprise.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }


}
