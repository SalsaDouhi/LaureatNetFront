export interface MessageResponse {
  messageId: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: Date;
}
