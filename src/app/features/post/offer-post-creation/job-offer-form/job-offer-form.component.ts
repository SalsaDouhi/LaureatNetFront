import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TechnologyDataService } from '../../../../core/services/technologyData.service';
import { EntrepriseService } from '../../../../core/services/entrepriseData.service';
import { Technology } from '../../../../shared/interfaces/Technology';
import { EntrepriseShowMV } from '../../../../shared/interfaces/EntrepriseShowMV';
import { PostTechnologyTagsComponent } from '../../post-technology-tags/post-technology-tags.component';

@Component({
  selector: 'app-job-offer-form',
  templateUrl: './job-offer-form.component.html',
  styleUrl: './job-offer-form.component.css'
})
export class JobOfferFormComponent {
    formData! : FormData;
    jobOfferForm: FormGroup;
    entreprises! : EntrepriseShowMV[];
    technologies!: Technology[];
    @ViewChild(PostTechnologyTagsComponent) technologySelectionComponent!: PostTechnologyTagsComponent;

	constructor(
		private fb: FormBuilder,
		private technologyDataService: TechnologyDataService,
		private entrepriseService: EntrepriseService
	) {
		this.jobOfferForm = this.fb.group({
			entrepriseId: [0, Validators.required],
			startDate: ['', Validators.required],
			endDate: ['', Validators.required],
			jobTitle: ['', Validators.required],
		});
	}

  	ngOnInit() {
    	this.technologyDataService.getAllTechnologies().subscribe(technologies => {
			this.technologies = technologies;
		});    
		this.entrepriseService.getAllEntreprises().subscribe(entreprises => {
			this.entreprises = entreprises;
		});
	}


	onSubmit() {
		if (this.jobOfferForm.invalid) {
			console.error(this.jobOfferForm)  
				return;
		}

		this.formData = new FormData();
		if(this.technologySelectionComponent.selectedTechnologies
			&& this.technologySelectionComponent.selectedTechnologies.length>0){
			
			this.formData.set("technologyList", this.technologySelectionComponent.selectedTechnologies.map(t=>t.id).join(','));
		}
		Object.keys(this.jobOfferForm.controls).forEach(key => {
			const controlValue = this.jobOfferForm.get(key)?.value;
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
	submitForm(){
		console.log("tried to submit")
		this.onSubmit();
	}
	clearForm() {
		this.jobOfferForm.reset({
			entrepriseId: '',
			technologyList: [],
			startDate: '',
			endDate: '',
			jobTitle: '',
			attachments: []
		});
	}
}
