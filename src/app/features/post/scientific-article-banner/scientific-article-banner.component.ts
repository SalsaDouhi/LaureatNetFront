import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-scientific-article-banner',
	templateUrl: './scientific-article-banner.component.html',
	styleUrl: './scientific-article-banner.component.css'
})
export class ScientificArticleBannerComponent {
	@Input() title?: string;
	@Input() datePublished?: string;
	@Input() authors?: string;
	@Input() publisherName?: string;
}
