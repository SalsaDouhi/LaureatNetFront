import { Component, OnInit } from '@angular/core';
import { Connection } from '../../../shared/interfaces/Connection';
import { AuthService } from '../../../core/services/auth.service';
import { Block } from '../../../shared/interfaces/Block';
import { MessageService } from 'primeng/api';
import { ModalService } from '../../../core/services/model.service';
import { ConfirmationDialogService } from '../../../core/services/confirmation-dialog.service';
import { BlockService } from '../../../core/services/blockData.service';

@Component({
    selector: 'app-block-list',
    templateUrl: './block-list.component.html',
    styleUrls: ['./block-list.component.css'],
})
export class BlockListComponent implements OnInit {
    blocks: Block[] = [];
    filteredConnections: Connection[] = [];
    searchTerm: string = '';
    currentUserId: number = 0;

    constructor(
        private blockService: BlockService,
        private authService: AuthService,
        private confirmationDialogService: ConfirmationDialogService,
        private modalService: ModalService,
        private messageService: MessageService,
    ) { }

    ngOnInit(): void {
        this.getBlocks();
    }

    getBlocks(): void {
        this.currentUserId = this.authService.getCurrentUserId() ?? 0;
        let profileId = this.currentUserId;
        this.blockService.getBlocksByUserId(profileId)
            .subscribe((blocks: Block[]) => {
                this.blocks = blocks;
            });
    }

    unblock(blockId: number): void {
      const userId = this.authService.getCurrentUserId();
      if (userId !== null) {
        this.modalService.openPasswordModal('Veuillez entrer votre mot de passe pour débloquer le membre', userId, blockId)
          .then((result: { isPasswordCorrect: boolean }) => {
            if (result.isPasswordCorrect === true) {
              this.confirmationDialogService.confirm('Veuillez confirmer..', 'Voulez-vous vraiment supprimer ce blocage?', 'Débloquer')
                .then((confirmed) => {
                  if (confirmed) {
                    this.blockService.deleteBlock(blockId)
                      .subscribe(() => {
                        this.confirmationDialogService.close();
                        this.messageService.add({
                          severity: 'success',
                          summary: 'Succès',
                          detail: 'Débloqué avec succès!',
                        });
                        this.getBlocks();
                      }, (error) => {
                        this.confirmationDialogService.close();
                        this.messageService.add({
                          severity: 'error',
                          summary: 'Erreur',
                          detail: error.message || 'Échec du déblocage du membre!',
                        });
                      });
                  }
                });
            }
          });
      } else {
        console.error('L\'ID utilisateur n\'est pas disponible.');
      }
    }    
}