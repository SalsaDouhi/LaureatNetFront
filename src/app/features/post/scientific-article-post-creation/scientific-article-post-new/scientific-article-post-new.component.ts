import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadComponent } from '../../file-upload/file-upload.component';
import { Technology } from '../../../../shared/interfaces/Technology';
import { TechnologyDataService } from '../../../../core/services/technologyData.service';
import { PostTechnologyTagsComponent } from '../../post-technology-tags/post-technology-tags.component';

@Component({
  selector: 'app-scientific-article-post-new',
  templateUrl: './scientific-article-post-new.component.html',
  styleUrl: './scientific-article-post-new.component.css'
})
export class ScientificArticlePostNewComponent {
  form!: FormGroup;
  formData! : FormData;
  @ViewChild(FileUploadComponent) fileUploadComponent!: FileUploadComponent;
  technologies!:Technology[];
  @ViewChild(PostTechnologyTagsComponent) technologyTagsComponent!: PostTechnologyTagsComponent;

  constructor(private fb: FormBuilder,
	private techService: TechnologyDataService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      datePublished: ['', Validators.required],
      listOfAuthors: ['', Validators.required],
    });
  }
	ngOnInit(){
		this.techService.getAllTechnologies().subscribe(technologies=>{
			this.technologies = technologies;
		});
	}
	submitForm(){
		this.onSubmit();
	}
  onSubmit() {
    if(this.form.invalid){
      return;
    }
    this.formData = new FormData();
    this.formData.append('title', this.form.value.title);
    this.formData.append('datePublished', this.form.value.datePublished);
    this.formData.append('authors', this.form.value.listOfAuthors);
    this.formData.append('article', this.fileUploadComponent.files[0]);
	this.formData.append('technologyList', this.technologyTagsComponent.selectedTechnologies.map(tech => tech.id).join(','));
}



  clearForm() {
    this.form.reset();
  }
}
