import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../core/services/auth.service';
import { ConnectionService } from '../../../core/services/connectionData.service';

@Component({
  selector: 'app-connection-btn',
  templateUrl: './connection-btn.component.html',
})
export class ConnectionBtnComponent  {
  @Input() receiverId: number = 0;
  @Output() connectionRequestSent = new EventEmitter<void>();
  currentUserId: number = 0;

  constructor(
    private connectionService: ConnectionService,
    private authService: AuthService,
    private messageService: MessageService,
  ) {}

  sendConnectionRequest(): void {
    this.currentUserId = this.authService.getCurrentUserId() ?? 0;
    let profileId = this.currentUserId;
    const connectionData = {
      senderId: profileId,
      receiverId: this.receiverId,
    };
    this.connectionService.createConnection(connectionData)
      .subscribe(
        (response) => {
          console.log('Demande de connexion envoyée avec succès!', response);
          this.connectionRequestSent.emit();
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: 'Demande de connexion envoyée avec succès!',
          });
        },
        (error: string) => {
          console.log('La demande de connexion a échoué!', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'La demande de connexion a échoué!',
          });
        }
      );
  }


}