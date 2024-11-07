import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { CommentService } from '../../../core/services/commentData.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../../shared/components/modals/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-comment-container',
  templateUrl: './comment-container.component.html',
  styleUrl: './comment-container.component.css',
})
export class CommentContainerComponent {
    @Input() createdAt:string = "10 Apr, 2022";
    @Input() pic!: string;
    @Input() content!:string;
    @Input() commentorId!:number;
    @Input() commentId!:number;
    @Input() commentorFullName!:string;
    @Output() deletedCommentEvent: EventEmitter<number> = new EventEmitter()

    userId = 0;
    constructor(protected authService: AuthService,
        private commentService: CommentService,
        private dialog: MatDialog
    ){
        this.userId = authService.getCurrentUserId();
        console.log("userId",this.userId);
    }
    ngOnInit(){
        console.log("commentorId",this.commentorId)
        console.log("username",this.commentorFullName)
    }
    deleteComment() {
        const dialogRef = this.dialog.open(ConfirmModalComponent, {
            width: '400px',
            data: {
                title: 'Confirmation',
                message: `Are you sure you want to delete this comment?`,
                type: 'danger',
            },
        });
      
        dialogRef.afterClosed().subscribe((result) => {
            if(result){
                console.log(result);
                if (result.confirmed != true) return;
                this.commentService.deleteComment(this.commentId).subscribe({
                    error(err) {
                        console.error(err);
                    },
                    complete:()=>{
                        this.deletedCommentEvent.emit(this.commentId);
                    },
                });
            }
        });

    }

}
