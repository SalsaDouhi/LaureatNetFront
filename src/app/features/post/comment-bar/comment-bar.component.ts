import { Component, EventEmitter, Output } from '@angular/core';
import { CommentService } from '../../../core/services/commentData.service';
import { Comment } from '../../../shared/interfaces/Post';
import { AuthService } from '../../../core/services/auth.service';
import { CommentCreation } from '../../../shared/interfaces/CommentCreation';


@Component({
	selector: 'app-comment-bar',
	templateUrl: './comment-bar.component.html',
	styleUrl: './comment-bar.component.css'
})
export class CommentBarComponent {
	newCommentContent:string="";
	@Output() commentEvent: EventEmitter<string> = new EventEmitter();

	addComment(){
		this.commentEvent.emit(this.newCommentContent);
		this.newCommentContent = ''; // Clear the input after adding the comment
	}



}
