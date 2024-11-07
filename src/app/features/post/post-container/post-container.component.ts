import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Comment, Post } from '../../../shared/interfaces/Post';
import { PostDataService } from '../../../core/services/postData.service';
import { AuthService } from '../../../core/services/auth.service';
import { LikeDataService } from '../../../core/services/likeData.service';
import { Like } from '../../../shared/interfaces/Like';
import { PostLikeAndCommentBarComponent } from '../post-like-and-comment-bar/post-like-and-comment-bar.component';
import { ProfileService } from '../../../core/services/profile.service';
import { ConfirmModalComponent } from '../../../shared/components/modals/confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CommentService } from '../../../core/services/commentData.service';

@Component({
  selector: 'app-post-container',
  templateUrl: './post-container.component.html',
  styleUrl: './post-container.component.css',
})
export class PostContainerComponent {
  @Input() width: String = 'w-50';
  @ViewChild(PostLikeAndCommentBarComponent)
  postLikeAndCommentBarComponent!: PostLikeAndCommentBarComponent;
  @Input() post!: Post;
  userId: number = 0;

  constructor(
    private postDataService: PostDataService,
    private authService: AuthService,
    private likeService: LikeDataService,
    public profileService: ProfileService,
    public commentService: CommentService,
	private dialog: MatDialog
) {}

  ngOnInit() {
    this.userId = this.authService.getCurrentUserId();
  }
  ngAfterViewInit() {
    if (
      this.post.likes?.filter((like) => like.likerId === this.userId).length > 0
    ) {
      setTimeout(() => {
        this.postLikeAndCommentBarComponent.likeToggle();
      });
    }
    console.log(this.post.userFullName);
  }

  	@Output() deletionEvent: EventEmitter<number> = new EventEmitter();
  	deletePost() {
		const dialogRef = this.dialog.open(ConfirmModalComponent, {
			width: '400px',
			data: {
				title: 'Confirmation',
				message: `Are you sure you want to delete this post?`,
				type: 'danger',
			},
		});

		dialogRef.afterClosed().subscribe((result) => {
			if(result){
				console.log(result);
				if (result.confirmed != true) return;
				this.postDataService.deletePost(this.post.id).subscribe({
					complete: () => {
					  console.log('success');
					  this.deletionEvent.emit(this.post.id);
					},
					error(err: any) {
					  console.error('failed to delete');
					},
				});
			}
		});
	}


	//ToggleModalEvent: boolean = false;

	updateComments(){
		this.commentService.getCommentsByPostId(this.post.id).subscribe({
			next:(newComments) => {
				this.post.comments.splice(0, this.post.comments.length, ...newComments);
				//console.log("newComments",newComments);
			}
		})
	}

  likeToggle(event: any) {
    if (event === true) {
      const like = new FormData();
      like.append('postId', this.post.id.toString());
      like.append('likerId', this.userId.toString());
      this.likeService.createLike(like).subscribe({
        next: (like: Like) => {
          this.post.likes.push(like);
          this.postLikeAndCommentBarComponent.likeToggle();
        },
        error(err) {
          console.error('error', err);
        },
      });
    } else if (event === false) {
      const like = new FormData();
      like.append('postId', this.post.id.toString());
      like.append('likerId', this.userId.toString());
      this.likeService.removeLike(like).subscribe({
        complete: () => {
          this.post.likes = this.post.likes.filter(
            (like) => like.likerId !== this.userId
          );
          this.postLikeAndCommentBarComponent.likeToggle();
        },
        error() {
          console.log('error');
        },
      });
    }
  }

  	getProfileImage() {
    	if (this.post.userProfileImage)
      		return 'http://localhost:8080/api/v1/files/' + this.post.userProfileImage;
    	return 'assets/images/no_pfp.png';
  	}  
  	getArticle() {
    	return 'http://localhost:8080/api/v1/files/' + this.post.scientificArticlePath;
  	}
}
