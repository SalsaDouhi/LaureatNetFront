import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrepriseService } from '../../../core/services/entrepriseData.service';
import { Entreprise } from '../../../shared/interfaces/Entreprise'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntrepriseVM } from '../../../shared/interfaces/EntrepriseVM';

@Component({
  selector: 'app-update-entreprise',
  templateUrl: './update-entreprise.component.html',
  styleUrls: ['./update-entreprise.component.css']

})
export class UpdateEntrepriseComponent implements OnInit {
  entrepriseForm!: FormGroup;
  newX=0;
	newY=0;
  x=0;
  y=0;
  entreprise: Entreprise = {
    title: '',
    logo: '',
    localisationX: 0,
    localisationY: 0,
    tel: '',
    email: '',
    website: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private entrepriseService: EntrepriseService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getEntreprise();
  }

  initForm(): void {
    this.entrepriseForm = this.formBuilder.group({
      title: ['', Validators.required],
      localisationX: [0, Validators.required],
      localisationY: [0, Validators.required],
      tel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      website: ['', Validators.required],
      logoFile: [null]
    });
  }

  getEntreprise(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.entrepriseService.getEntrepriseById(id)
        .subscribe(entreprise => {
          this.entreprise = entreprise;
          this.x=this.entreprise.localisationX;
          this.y=this.entreprise.localisationY;
          console.log(this.x); console.log(entreprise);
          this.patchForm();
        });
    }
  }

  patchForm(): void {
    this.entrepriseForm.patchValue({
      title: this.entreprise.title,
      localisationX: this.entreprise.localisationX,
      localisationY: this.entreprise.localisationY,
      tel: this.entreprise.tel,
      email: this.entreprise.email,
      website: this.entreprise.website
    });
   
  }
  onLocationSelected(location: { x: number, y: number }): void {
		// Update the form controls with the selected coordinates
		this.newX= location.x;
		this.newY = location.y;
	  }
    OnSve() {
      this.entrepriseForm.patchValue({
        localisationX: this.newX,
        localisationY: this.newY
        });
    }
  updateEntreprise(): void {
    if (this.entrepriseForm.invalid) {
      console.log("Formulaire invalide", this.entrepriseForm);
      return;
    }
    
    const formData = new FormData();
    const entreprise: EntrepriseVM = {
		title: this.entrepriseForm.value.title,
		localisationX: +this.entrepriseForm.value.localisationX, // Convert to number
		localisationY: +this.entrepriseForm.value.localisationY, // Convert to number
		tel: this.entrepriseForm.value.tel,
		email: this.entrepriseForm.value.email,
		website: this.entrepriseForm.value.website,
		};console.log(entreprise)
        const blob = new Blob([JSON.stringify(entreprise)], { type: 'application/json' });
		formData.append('entreprise', blob);
    const logoFileInput = document.getElementById('logoFile') as HTMLInputElement | null;
    if (logoFileInput) {
      const logoFile = logoFileInput.files?.item(0);
      if (logoFile) {
        formData.append('logo', logoFile);
      }
    }

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.entrepriseService.updateEntreprise(id, formData)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.router.navigate(['/entreprise']);
  }
}
