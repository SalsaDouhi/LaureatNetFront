export interface ConversationResponse {
  conversationId: number;
  otherUserId: number;
  otherUserName: string;
  picture: string;
  lastMessage: string;
  lastMessageTimestamp: string;
}
