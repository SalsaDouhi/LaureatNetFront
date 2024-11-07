import { Component, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScientificArticleShowDTO } from '../../../../shared/interfaces/ScientificArticleShowMV';
import { TechnologyDataService } from '../../../../core/services/technologyData.service';
import { Technology } from '../../../../shared/interfaces/Technology';
import { PostTechnologyTagsComponent } from '../../post-technology-tags/post-technology-tags.component';

@Component({
  selector: 'app-scientific-article-post-existing',
  templateUrl: './scientific-article-post-existing.component.html',
  styleUrl: './scientific-article-post-existing.component.css'
})
export class ScientificArticlePostExistingComponent {
	form!: FormGroup;
	formData!: FormData;
	@Input() articles: ScientificArticleShowDTO[] = [];
    technologies!:Technology[];

	@ViewChild(PostTechnologyTagsComponent) technologyTagsComponent!: PostTechnologyTagsComponent;

	constructor(private fb: FormBuilder,
		private techService: TechnologyDataService) {		this.form = this.fb.group({
	    	articleId: ['', Validators.required]
	  	});
	}
	ngOnInit(){
		this.techService.getAllTechnologies().subscribe(technologies=>{
			this.technologies = technologies;
		});
	}
	submitForm() {
	  	this.onSubmit();
	}

	onSubmit() {
		if (this.form.invalid) {
			return;
		}
		this.formData = new FormData();
		this.formData.append('articleId', this.form.value.articleId);
		this.formData.append('technologyList', this.technologyTagsComponent.selectedTechnologies.map(tech => tech.id).join(','));
	}

	clearForm() {
	  	this.form.reset();
	}
}
