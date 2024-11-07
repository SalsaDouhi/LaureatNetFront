import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
	selector: 'app-post-options-button',
	templateUrl: './post-options-button.component.html',
	styleUrl: './post-options-button.component.css'
})
export class PostOptionsButtonComponent {
	userId:number=0;
	@Input() posterId!:number;
	@Output() deletePostEvent= new EventEmitter<any>();
	constructor(private authService: AuthService ){
		this.userId = authService.getCurrentUserId();
	}

}
