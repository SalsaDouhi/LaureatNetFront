import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from '../../../shared/interfaces/Post';
import { CommentService } from '../../../core/services/commentData.service';
import { AuthService } from '../../../core/services/auth.service';
import { CommentCreation } from '../../../shared/interfaces/CommentCreation';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-comments-modal',
  templateUrl: './comments-modal.component.html',
  styleUrl: './comments-modal.component.css',
})
export class CommentsModalComponent {
  @Input() postId!: number;
  @Output() closeModal: EventEmitter<any> = new EventEmitter();



	@Output() update: EventEmitter<void> = new EventEmitter();
  	onClose() {
    	this.closeModal.emit();
  	}
	comments!: Comment[];

	constructor(private commentService: CommentService,
		private authService: AuthService,
		private messageService: MessageService
	){}
	ngOnInit(){
		this.commentService.getCommentsByPostId(this.postId).subscribe({
			next : (comments: Comment[])=> {
				this.comments = comments;
				console.log("comments",this.comments);
			},
			error(err: any) {
				console.error(err);
			},
		});
	}

	newComment(newCommentContent: any) {
		if (newCommentContent){
			const comment : CommentCreation={
				commentorId 	: this.authService.getCurrentUserId(),
				content 	: newCommentContent,
				postId: this.postId
			}
			console.log(comment);
			this.commentService.createComment(comment).subscribe(comment => {
				console.log(comment);
				this.comments.push(comment)
				this.update.emit();
			});
		}
	}
	onDeleteComment(deltedCommentId: number) {
		this.comments = this.comments.filter(c => c.id!==deltedCommentId);
		this.update.emit();
	}
}
