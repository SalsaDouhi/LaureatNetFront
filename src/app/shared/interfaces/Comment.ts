export interface Comment {
  id: number;
  content: string;
  replyTo: number;
  createdAt: Date;

  postId: number;
  posterId: number;
  posterFullName: string;
  
  commentorId: number;
  commentorFullName: string;
}