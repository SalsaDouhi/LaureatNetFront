import { Component, Input } from '@angular/core';
import { Comment } from '../../../shared/interfaces/Comment';

@Component({
  selector: 'app-comment-line',
  templateUrl: './comment-line.component.html',
  styleUrl: './comment-line.component.css',
})
export class CommentLineComponent {
  @Input() comment: Comment = {} as Comment;
}
