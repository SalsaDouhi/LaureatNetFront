import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LikeDataService } from '../../../core/services/likeData.service';
import { Comment } from '../../../shared/interfaces/Post';
@Component({
  selector: 'app-post-like-and-comment-bar',
  templateUrl: './post-like-and-comment-bar.component.html',
  styleUrl: './post-like-and-comment-bar.component.css'
})
export class PostLikeAndCommentBarComponent {
	@Input() liked: boolean = false;
	@Output() likeToggleEvent:EventEmitter<boolean> = new EventEmitter();
	@Input() postId!:number;
	@Input() comments!:Comment[];
	showModal: boolean = false;
	@Output() ToggleModalEvent:EventEmitter<void> = new EventEmitter();

	
	constructor(private likeService: LikeDataService){}

	toggleModal() {
		console.log("clicked the comment button")
		this.showModal = !this.showModal;
		if(this.showModal){
			document.body.classList.add("no-scroll")
		}else{
			document.body.classList.remove("no-scroll")
		}
		this.ToggleModalEvent.emit();
	}

	likeToggle(){
    	this.liked = !this.liked;		
	}
}
