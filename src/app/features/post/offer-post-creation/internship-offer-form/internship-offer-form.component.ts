import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TechnologyDataService } from '../../../../core/services/technologyData.service';
import { EntrepriseService } from '../../../../core/services/entrepriseData.service';
import { Technology } from '../../../../shared/interfaces/Technology';
import { EntrepriseShowMV } from '../../../../shared/interfaces/EntrepriseShowMV';
import { PostTechnologyTagsComponent } from '../../post-technology-tags/post-technology-tags.component';

@Component({
  selector: 'app-internship-offer-form',
  templateUrl: './internship-offer-form.component.html',
  styleUrl: './internship-offer-form.component.css'
})
export class InternshipOfferFormComponent {
  formData!: FormData;
  internshipOfferForm: FormGroup;
  entreprises! : EntrepriseShowMV[];
  technologies!: Technology[];
  @ViewChild(PostTechnologyTagsComponent) technologySelectionComponent!: PostTechnologyTagsComponent;

  constructor(
      private fb: FormBuilder,
      private entrepriseDataService: EntrepriseService,
      private technologyDataService: TechnologyDataService
  ) {
      this.internshipOfferForm = this.fb.group({
          entrepriseId: ['', Validators.required],
          startDate: ['', Validators.required],
          endDate: ['', Validators.required],
          roleTitle: ['', Validators.required],
          duration: ['', Validators.required],
      });
  }

  ngOnInit() {
    this.entrepriseDataService.getAllEntreprises().subscribe(entreprises => {
      this.entreprises = entreprises;
    });
    this.technologyDataService.getAllTechnologies().subscribe(technologies => {
      this.technologies = technologies;
    });
  }



  onSubmit() {
      if (this.internshipOfferForm.invalid) {
        console.error(this.internshipOfferForm);
        return;
      }

      this.formData = new FormData();
      if(this.technologySelectionComponent.selectedTechnologies
        && this.technologySelectionComponent.selectedTechnologies.length>0){
        
        this.formData.set("technologyList", this.technologySelectionComponent.selectedTechnologies.map(t=>t.id).join(','));
      }
      Object.keys(this.internshipOfferForm.controls).forEach(key => {
          const controlValue = this.internshipOfferForm.get(key)?.value;
          if (Array.isArray(controlValue) && controlValue[0] instanceof File) {
              controlValue.forEach((file: File, index: number) => {
                  this.formData.append(`${key}`, file);
              });
          } else if (Array.isArray(controlValue)) {
              this.formData.append(key, controlValue.join(','));
          } else {
              this.formData.set(key, controlValue);
          }
      });

  }

  submitForm() {
    console.log("tried to submit")
    this.onSubmit();
  }
  clearForm() {
    this.internshipOfferForm.reset({
        entrepriseId: '',
        startDate: '',
        endDate: '',
        jobTitle: '',
        attachments: []
    });
}
}
