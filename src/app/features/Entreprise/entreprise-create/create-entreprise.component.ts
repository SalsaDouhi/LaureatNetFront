import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ɵrestoreComponentResolutionQueue,
} from '@angular/core';
import { EntrepriseVM } from '../../../shared/interfaces/EntrepriseVM';
import { EntrepriseService } from '../../../core/services/entrepriseData.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-entreprise',
  templateUrl: './create-entreprise.component.html',
  styleUrls: ['./create-entreprise.component.css'],
})
export class CreateEntrepriseComponent implements OnInit {
  entrepriseForm!: FormGroup;
  @ViewChild('mapLocation') mapLocation!: ElementRef;
  newX = 0;
  newY = 0;

  showMap: boolean = false;
  toggleMapVisibility(): void {
    this.showMap = !this.showMap;
  }

  constructor(
    private formBuilder: FormBuilder,
    private entrepriseService: EntrepriseService,
    private router: Router
  ) {}
  logoFile: File | null = null;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.entrepriseForm = this.formBuilder.group({
      title: ['', Validators.required],
      localisationX: [0, Validators.required],
      localisationY: [0, Validators.required],
      tel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      website: ['', Validators.required],
      logo: [null],
    });
  }
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.logoFile = fileInput.files[0];
    }
  }
  onLocationSelected(location: { x: number; y: number }): void {
    // Update the form controls with the selected coordinates
    this.newX = location.x;
    this.newY = location.y;
  }
  onSave() {
    this.entrepriseForm.patchValue({
      localisationX: this.newX,
      localisationY: this.newY,
    });
  }

  onSubmit(): void {
    if (this.entrepriseForm.invalid) {
      // console.log('well', this.entrepriseForm);
      this.entrepriseForm.markAllAsTouched();
      return;
    }

    const formData = new FormData();
    const logoFileInput = document.getElementById('logo') as HTMLInputElement;
    const logoFile = logoFileInput.files?.item(0);
    const entreprise: EntrepriseVM = {
      title: this.entrepriseForm.value.title,
      localisationX: +this.entrepriseForm.value.localisationX, // Convert to number
      localisationY: +this.entrepriseForm.value.localisationY, // Convert to number
      tel: this.entrepriseForm.value.tel,
      email: this.entrepriseForm.value.email,
      website: this.entrepriseForm.value.website,
    };
    // console.log(entreprise);
    const blob = new Blob([JSON.stringify(entreprise)], {
      type: 'application/json',
    });
    // console.log(entreprise);
    formData.append('entreprise', blob);
    if (logoFile) {
      // console.log(logoFile);
      formData.append('logo', logoFile);
    }

    this.entrepriseService.createEntreprise(formData).subscribe({
      next: (response) => {
        // console.log('Entreprise créée avec succès:', response);
        // console.log('Entreprise créée avec succès:', formData);
        this.router.navigate(['/entreprise']); // Réinitialiser le formulaire après soumission réussie
      },
      error: (err) => {
        console.error("Erreur lors de la création de l'entreprise:", err);
      },
    });
  }
  /*onFileSelected(event: Event): void {
		const fileInput = event.target as HTMLInputElement;
		if (fileInput.files && fileInput.files.length > 0) {
			console.log(fileInput.files[0]);
			this.entrepriseForm.patchValue({logoFile: fileInput.files[0]});
			console.log(this.entrepriseForm.value.logoFile);

		}
	}*/
}
