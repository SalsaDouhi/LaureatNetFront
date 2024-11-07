export interface MessageRequest {
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
}
