import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-post-content-input',
  templateUrl: './post-content-input.component.html',
  styleUrl: './post-content-input.component.css'
})
export class PostContentInputComponent {
	@Input() placeHolderValue:string = "Whats on your mind?"
	inputContent:string = '';

}
