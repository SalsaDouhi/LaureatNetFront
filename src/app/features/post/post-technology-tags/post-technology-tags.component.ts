import { Component, Input } from '@angular/core';
import { Technology } from '../../../shared/interfaces/Technology';

@Component({
  selector: 'app-post-technology-tags',
  templateUrl: './post-technology-tags.component.html',
  styleUrl: './post-technology-tags.component.css'
})
export class PostTechnologyTagsComponent {
	inputValue: string = '';
	suggestions: Technology[] = [];
	@Input() technologies!: Technology[];
	selectedTechnologies: Technology[] = [];
  
	
	onInputChange() {
		if (this.inputValue.trim() === '') {
		  this.suggestions = [];
		  return;
		}
		this.suggestions = this.technologies.filter(tech =>
		  tech.title?.toLowerCase().includes(this.inputValue.toLowerCase()) &&
		  !this.selectedTechnologies.map(t=>t.id).includes(tech.id)
		);
	}
	
	selectSuggestion(suggestion: Technology) {
		if(suggestion && !this.selectedTechnologies.map(t=>t.id).includes(suggestion.id)) {
			this.selectedTechnologies.push(suggestion);
			this.inputValue = '';
			this.suggestions = [];
		}
	}
	
	
	removeTag(tech: Technology) {
		this.selectedTechnologies = this.selectedTechnologies.filter(t => t.id !== tech.id);
	}
}