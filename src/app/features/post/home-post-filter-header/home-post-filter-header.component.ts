import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { trigger, state, style, transition, animate, AnimationBuilder, AnimationPlayer } from '@angular/animations';

@Component({
	selector: 'app-home-post-filter-header',
	templateUrl: './home-post-filter-header.component.html',
	styleUrl: './home-post-filter-header.component.css',
})
export class HomePostFilterHeaderComponent {
	//posts: Post[] = [];
	//filteredPosts: Post[] = [];
    @Output() filterChangeEvent: EventEmitter<string> = new EventEmitter();
	activeFilter:string="all";


	constructor(private themeService: ThemeService) {}


	getTheme(){
		return this.themeService.getTheme();
	}

	filterPosts(newFilter: string): void {
		if (newFilter !== this.activeFilter) {
			this.activeFilter = newFilter;
			this.filterChangeEvent.emit(this.activeFilter);
	 	}
	}

	

	getButtonClass(filterType: string): string {
		const isActive = this.activeFilter === filterType;
		const theme = this.getTheme();
		return isActive ? (theme === 'light' ? 'btn-active-light' : 'btn-active-dark') : (theme === 'light' ? 'btn-inactive-light' : 'btn-inactive-dark');
	}
	
}
