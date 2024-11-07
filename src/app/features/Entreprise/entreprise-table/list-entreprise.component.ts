import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntrepriseService } from '../../../core/services/entrepriseData.service';
import { Entreprise } from '../../../shared/interfaces/Entreprise'; 

@Component({
  selector: 'app-list-entreprise',
  templateUrl: './list-entreprise.component.html',
  styleUrls: ['./list-entreprise.component.css'],
})
export class ListEntrepriseComponent implements OnInit {
  entreprises: Entreprise[] = [];
  filteredEntreprises: Entreprise[] = [];
  searchTerm: string = '';
  constructor(private entrepriseService: EntrepriseService, private router: Router) { }

  ngOnInit(): void {
    this.getEntreprises();
  }

  getEntreprises(): void {
    this.entrepriseService.getAllEntreprises()
      .subscribe(entreprises => {
        this.entreprises = entreprises;
        this.filteredEntreprises = [...this.entreprises];
      });
  }

  
  goToCreateEntreprise(): void {
    this.router.navigate(['entreprise/create']);
  }

  filterCompanies(): void {
    this.filteredEntreprises = this.entreprises.filter(entreprise =>
      entreprise.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  onSearchTermChange(): void {
    this.filterCompanies();
  }
}
