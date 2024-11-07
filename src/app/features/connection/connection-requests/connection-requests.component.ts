import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Connection } from '../../../shared/interfaces/Connection';
import { MessageService } from 'primeng/api';
import { ConfirmationDialogService } from '../../../core/services/confirmation-dialog.service';
import { ConnectionService } from '../../../core/services/connectionData.service';

@Component({
    selector: 'app-connection-requests',
    templateUrl: './connection-requests.component.html',
    styleUrls: ['./connection-requests.component.css'],
    providers: [MessageService],
})
export class ConnectionRequestsComponent implements OnInit {
    @Output() cancelConnectionEvent = new EventEmitter<number>();
    connections: Connection[] = [];
    currentUserId: number = 0;
    currentView: 'received' | 'sent' = 'received';
    isLoading: boolean = true; // Add a loading indicator
    noInvitationsFoundError: boolean = false;

    constructor(
        private connectionService: ConnectionService,
        private authService: AuthService,
        private messageService: MessageService,
        private confirmationDialogService: ConfirmationDialogService
    ) { }

    ngOnInit(): void {
        this.loadConnections();
    }

    loadConnections(): void {
        this.isLoading = true; 
        if (this.currentView === 'received') {
            this.getPendingConnectionsByReceiverId();
        } else {
            this.getPendingConnectionsBySenderId();
        }
    }

    getPendingConnectionsByReceiverId(): void {
        this.currentUserId = this.authService.getCurrentUserId() ?? 0;
        let profileId = this.currentUserId;
        this.connectionService.getPendingConnectionsByReceiverId(profileId)
            .subscribe(
                connections => {
                    this.connections = connections;
                    this.isLoading = false; // Set loading to false when connections are loaded
                    console.log("connections received", this.connections);
                },
                error => {
                    this.isLoading = false; // Set loading to false on error too
                    if (error.status === 404) {
                        console.error('No invitations found.');
                        this.noInvitationsFoundError = true;
                    } else {
                        console.error('Error fetching invitations:', error);
                    }
                }
            );
    }

    getPendingConnectionsBySenderId(): void {
        this.currentUserId = this.authService.getCurrentUserId() ?? 0;
        let profileId = this.currentUserId;
        this.connectionService.getPendingConnectionsBySenderId(profileId)
            .subscribe(
                connections => {
                    this.connections = connections;
                    this.isLoading = false; 
                    console.log("connections sent", this.connections);
                },
                error => {
                    this.isLoading = false; 
                    if (error.status === 404) {
                        console.error('No invitations found.');
                        this.noInvitationsFoundError = true;
                    } else {
                        console.error('Error fetching invitations:', error);
                    }
                }
            );
    }

    get filteredConnections(): Connection[] {
        return this.connections;
    }

    switchToReceived(): void {
        this.currentView = 'received';
        this.noInvitationsFoundError = false;
        this.loadConnections(); 
    }

    switchToSent(): void {
        this.currentView = 'sent';
        this.noInvitationsFoundError = false;
        this.loadConnections();
    }

    deleteConnection(id: number): void {    
        this.connectionService.deleteConnection(id)
          .subscribe(() => {
            this.connections = this.connections.filter(connection => connection.id !== id);
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Demande de connexion supprimée avec succès!',
            });
          });
      }
      
      acceptConnection(id: number): void {
        this.connectionService.updateConnection(id, true)
          .subscribe(() => {
            this.connections = this.connections.filter(connection => connection.id !== id);
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Demande de connexion acceptée avec succès!',
            });
          });
      }
      
      public openConfirmationDialog(connectionId: number) {
        this.confirmationDialogService.confirm('Êtes-vous sûr ?', 'Voulez-vous vraiment retirer maintenant ?', 'Retirer')
          .then((confirmed) => this.deleteConnection(connectionId))
          .catch(() => console.log('L\'utilisateur a rejeté la boîte de dialogue (par exemple, en utilisant ESC, en cliquant sur l\'icône de croix ou en cliquant à l\'extérieur de la boîte de dialogue)'));
      }
      
      getProfilePicture(picture: string) {
        if (picture && picture != '')
          return 'http://localhost:8080/api/v1/files/' + picture;
        return 'assets/images/no_pfp.png';
      }
}