import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConversationResponse } from '../../../shared/interfaces/chat/conversation-response';
import { Subscription } from 'rxjs';
import { MessageResponse } from '../../../shared/interfaces/chat/message-response';
import { UserService } from '../../../core/services/user.service';
import { StompService } from '../../../core/services/stomp.service';
import { ApiResponse } from '../../../shared/interfaces/api-response';
import { WebSocketResponse } from '../../../shared/interfaces/chat/web-socket-response';
import { MessageRequest } from '../../../shared/interfaces/chat/message-request';
import { Profile } from '../../../shared/interfaces/Profile';
import { ProfileService } from '../../../core/services/profile.service';
import { ConfirmModalComponent } from '../../../shared/components/modals/confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css',
})
export class ChatPageComponent implements OnInit, OnDestroy {
  currentUser: Profile = {
    userId: 0,
    email: '',
  } as Profile;

  friends: Profile[] = [];

  // all conversations
  userConversations: ConversationResponse[] = [];

  // ! selected conv
  // current selected conversation subscription
  stompUserSub: Subscription | undefined;

  // selected conversation
  selectedConversationId: number = -1;
  selectedConversationReceiverId: number = -1;
  selectedConversationReceiverName: string = '';

  // selected conversation messages
  selectedConversation: MessageResponse[] = [];

  // selected conversation messages subscription
  stompConvSub: Subscription | undefined;
  // + end of selected conv fields

  // message input field
  message: string = '';

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private dialog: MatDialog,
    private stomp: StompService
  ) {
    this.currentUser = userService.currentUser();
  }

  ngOnInit(): void {
    // subscribe to userId websocket to get updated conversation when gets new messages are sent
    this.currentUser.userId = Number.parseInt(
      this.profileService.getCurrentUserId()!
    );
    this.subscribeToCurrentUserConversation();

    this.getFriendsConversationsList();
  }

  ngOnDestroy(): void {
    // unsubscribe from all channels
    this.stompUserSub?.unsubscribe();
    this.stompConvSub?.unsubscribe();
  }

  getFriendsConversationsList() {
    this.userService.getFriends().subscribe((res: ApiResponse) => {
      this.friends = res.data;
    });
  }

  onCloseChat() {
    this.stompConvSub?.unsubscribe();
    this.selectedConversationId = -1;
  }

  subscribeToCurrentUserConversation() {
    // setting one second delayed to successfully connect the stomp to server
    setTimeout(() => {
      this.stompUserSub = this.stomp.subscribe(
        'user/' + this.profileService.getCurrentUserId(),
        (payload: any) => {
          let res: WebSocketResponse = payload;
          if (res.type == 'ALL') {
            this.userConversations = res.data;
            const found = this.userConversations.find(
              (item) => item.conversationId === this.selectedConversationId
            );
            if (found === undefined) {
              this.onCloseChat();
            }
          }
        }
      );
      // Notify that I'm subscribed to get initial data
      this.stomp.send('user', this.profileService.getCurrentUserId());
    }, 500);
  }

  // When new or exiting user selected Then set the variables and get the two users
  // conversationId from the database
  onUserSelected(user: Profile) {
    console.log(`on user select: `, user);
    this.selectedConversationReceiverId = user.userId;
    this.selectedConversationReceiverName =
      user.userProfile.firstName + ' ' + user.userProfile.lastName;

    this.userService
      .getConversationIdByUser1IdAndUser2Id(
        user.userId,
        this.currentUser.userId!
      )
      .subscribe((res: ApiResponse) => {
        this.selectedConversationId = res.data;
        this.getFriendsConversationsList();
        this.setConversation();
      });
  }

  // When user select a conversation from the list
  onConversationSelected(index: number) {
    this.selectedConversationId = this.userConversations[index].conversationId;
    this.selectedConversationReceiverId =
      this.userConversations[index].otherUserId;
    this.selectedConversationReceiverName =
      this.userConversations[index].otherUserName;

    this.setConversation();
  }

  // Set a conversation of selected conversationId
  setConversation() {
    // unsubscribe any previous subscription
    this.stompConvSub?.unsubscribe();
    // then subscribe to selected conversation
    // when get new message then add the message to first of the array
    this.stompConvSub = this.stomp.subscribe(
      'conv/' + this.selectedConversationId,
      (payload: any) => {
        let res: WebSocketResponse = payload;
        if (res.type == 'ALL') {
          this.selectedConversation = res.data;
        } else if (res.type == 'ADDED') {
          let msg: MessageResponse = res.data;
          this.selectedConversation.unshift(msg);
        }
      }
    );
    // Notify that I'm subscribed to get initial data
    this.stomp.send('conv', this.selectedConversationId);
  }

  // Send message to other user
  onSendMessage() {
    if (this.message.trim().length == 0) return;

    const timestamp = new Date();
    let body: MessageRequest = {
      conversationId: this.selectedConversationId.toString(),
      senderId: this.profileService.getCurrentUserId()!.toString(),
      receiverId: this.selectedConversationReceiverId.toString(),
      content: this.message.trim(),
      createdAt: timestamp,
    };
    this.stomp.send('sendMessage', body);
    this.message = '';
  }

  // When click delete on a message menu Then delete from database Then refresh
  // conversation list
  onDeleteMessage(messageId: number) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '400px',
      data: {
        title: 'Confirmation',
        message: `Voulez-vous supprimer cette commentaire ?`,
        type: 'danger',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.confirmed != true) return;

        this.stomp.send('deleteMessage', {
          conversationId: this.selectedConversationId,
          messageId: messageId,
        });
      }
    });
  }

  getProfilePicture(picture: string) {
    if (picture && picture != '')
      return 'http://localhost:8080/api/v1/files/' + picture;
    return 'assets/images/no_pfp.png';
  }
}
