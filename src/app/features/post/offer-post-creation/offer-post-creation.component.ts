import { Component, EventEmitter, Output, ViewChild, output } from '@angular/core';
import { JobOfferDataService } from '../../../core/services/JobOfferData.service';
import { InternshipOfferDataService } from '../../../core/services/InternshipOfferData.service';
import { AuthService } from '../../../core/services/auth.service';
import { PostContentInputComponent } from '../post-content-input/post-content-input.component';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { TechnologyDataService } from '../../../core/services/technologyData.service';
import { EntrepriseService } from '../../../core/services/entrepriseData.service';
import { JobOfferFormComponent } from './job-offer-form/job-offer-form.component';
import { InternshipOfferFormComponent } from './internship-offer-form/internship-offer-form.component';
import { ProfileService } from '../../../core/services/profile.service';

@Component({
  selector: 'app-offer-post-creation',
  templateUrl: './offer-post-creation.component.html',
  styleUrl: './offer-post-creation.component.css'
})
export class OfferPostCreationComponent {
    username: string = '';
    offerType: string = '';

    @ViewChild(PostContentInputComponent) postContentInput!: PostContentInputComponent;
    @ViewChild(FileUploadComponent) fileUploadComponent!: FileUploadComponent; // ViewChild to access the FileUploadComponent
    @ViewChild(JobOfferFormComponent) jobOfferFormComponent!: JobOfferFormComponent;
    @ViewChild(InternshipOfferFormComponent) internshipOfferFormComponent!: InternshipOfferFormComponent;

    @Output() closeEvent: EventEmitter<void> = new EventEmitter();
	@Output() sumbitEvent :EventEmitter<void> = new EventEmitter();

    userId: number = 0;

    constructor(
        private entrepriseDataService: EntrepriseService,
        private technologyDataService: TechnologyDataService,
        private jobOfferDataService: JobOfferDataService,
        private internshipOfferDataService: InternshipOfferDataService,
        private authService: AuthService,
        protected profileService: ProfileService
    ) {}

    ngOnInit() {
        this.userId = this.authService.getCurrentUserId()!;
    }

    onOfferTypeChange(event: any) {
        this.offerType = event.target.value;
    }

    createOfferPost() {
        if (this.offerType === 'job') {
            this.jobOfferFormComponent.submitForm();
            this.createJobOfferPost();
        } else if (this.offerType === 'internship') {
            this.internshipOfferFormComponent.submitForm();
            this.createInternshipOfferPost();
        }
    }
    
    createJobOfferPost(){
        const formData:FormData = this.jobOfferFormComponent.formData;
        formData.set('posterId', String(this.userId));
        formData.set('content', this.postContentInput.inputContent); // Adjust as necessary
		if(this.fileUploadComponent.getFiles().length>0){
			this.fileUploadComponent.getFiles().forEach((file: File) => {
				formData.append('attachments', file);
			});
		}

        formData.forEach(data=>{console.log(data)})
        this.jobOfferDataService.createJobOffer(formData).subscribe(
            response => {
                this.sumbitEvent.emit()
            },
            error => console.error('Error creating job offer', error)
        );
    }
    createInternshipOfferPost(){
        const formData:FormData = this.internshipOfferFormComponent.formData;
        formData.set('posterId', String(this.userId));
        formData.set('content', this.postContentInput.inputContent); // Adjust as necessary
		if(this.fileUploadComponent.getFiles().length>0){
			this.fileUploadComponent.getFiles().forEach((file: File) => {
				formData.append('attachments', file);
			});
		}

        formData.forEach(data=>{console.log(data)});
        this.internshipOfferDataService.createInternshipOffer(formData).subscribe(
            response => {
                this.sumbitEvent.emit()
            },
            error => console.error('Error creating internship offer', error)
        );
    }


    clearForm() {
        this.offerType = '';
        this.fileUploadComponent.clearFiles();
        this.postContentInput.inputContent= "";
        if (this.jobOfferFormComponent) {
            this.jobOfferFormComponent.clearForm();
        }
        if (this.internshipOfferFormComponent) {
            this.internshipOfferFormComponent.clearForm();
        }
    }

    cancel() {
        console.log('Offer post creation cancelled.');
        this.closeEvent.emit();
    }
}