import { Component, OnInit } from '@angular/core';
import { Connection } from '../../../shared/interfaces/Connection';
import { AuthService } from '../../../core/services/auth.service';
import { ConfirmationDialogService } from '../../../core/services/confirmation-dialog.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConnectionService } from '../../../core/services/connectionData.service';

@Component({
  selector: 'app-connection-list',
  templateUrl: './connection-list.component.html',
  styleUrls: ['./connection-list.component.css']
})
export class ConnectionListComponent implements OnInit {
    connections: Connection[] = [];
    filteredConnections: Connection[] = [];
    searchTerm: string = '';
    currentUserId: number = 0;

    constructor(
        private route: ActivatedRoute,
        private connectionService: ConnectionService, 
        private authService: AuthService,
        private confirmationDialogService: ConfirmationDialogService,
        private messageService: MessageService,
    ) { }

    ngOnInit(): void {
        this.getConnections();
    }

    getConnections(): void {
        this.route.params.subscribe((params) => {
        this.currentUserId = this.authService.getCurrentUserId() ?? 0;
        let profileId = this.currentUserId;
        if (params['id']) profileId = +params['id'];
        this.connectionService.getAcceptedConnections(profileId)
            .subscribe(connections => {
                console.log('connections received', connections);
                
                this.connections = connections;
                this.filteredConnections = this.connections;
            });
        });
    }

    
    deleteConnection(id: number): void {
        console.log('delete connection', id);
        this.connectionService.deleteConnection(id)
            .subscribe(() => {
                // Remove the deleted connection from connections array
                this.connections = this.connections.filter(connection => connection.id !== id);
                // Update filteredConnections as well
                this.filteredConnections = this.filteredConnections.filter(connection => connection.id !== id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Connexion supprimée avec succès !',
                });      
            });
    }

    searchConnections(): void {
        if (this.searchTerm.trim() === '') {
            this.filteredConnections = this.connections;
            return;
        }

        this.filteredConnections = this.connections.filter(connection => {
            return connection.fullname.toLowerCase().includes(this.searchTerm.toLowerCase());
        });
    }

    public openConfirmationDialog(connectionId: number) {
        this.confirmationDialogService.confirm('Êtes-vous sûr?', 'Voulez-vous vraiment retirer cette connexion ? Ce processus ne peut pas être annulé.', "Retirer")
        .then((confirmed) => {
            if(confirmed) {
                this.deleteConnection(connectionId);
            }
        })
        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
      }
      
      getProfilePicture(picture: string) {
        if (picture && picture != '')
          return 'http://localhost:8080/api/v1/files/' + picture;
        return 'assets/images/no_pfp.png';
      }
}