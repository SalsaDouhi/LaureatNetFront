import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { MessageService } from "primeng/api";
import { Connection } from "../../../shared/interfaces/Connection";
import { ConfirmationDialogService } from "../../../core/services/confirmation-dialog.service";
import { Router } from "@angular/router";
import { BlockService } from "../../../core/services/blockData.service";

@Component({
    selector: 'app-block-btn',
    templateUrl: './block-btn.component.html',
})

export class BlockBtnComponent implements OnInit {
    @Input() blockedUserId: number = 0;
    @Input() blockerUserId: number = 0;
    @Output() connectionRequestDeleted = new EventEmitter<void>();

    connections: Connection[] = [];

    constructor(
        private messageService: MessageService,
        private confirmationDialogService: ConfirmationDialogService,
        private blockService: BlockService,
        private router: Router
    ) { }

    ngOnInit(): void { }

    public openConfirmationDialog() {
        this.confirmationDialogService.confirm('Êtes-vous sûr ?', 'Voulez-vous vraiment bloquer cet utilisateur ?', 'Bloquer')
          .then((confirmed) => this.blockUser(this.blockedUserId, this.blockerUserId))
          .catch(() => console.log('L\'utilisateur a rejeté la boîte de dialogue (par exemple, en utilisant ESC, en cliquant sur l\'icône de croix ou en cliquant à l\'extérieur de la boîte de dialogue)'));
      }
      
      public blockUser(blockedUserId: number, blockerUserId: number) {
        console.log('Bloquer utilisateur:', blockedUserId, blockerUserId);
        
        let body = {
          blockerId: blockerUserId,
          blockedId: blockedUserId,
        }
        this.blockService.createBlock(body).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: 'Utilisateur bloqué avec succès',
            });
            this.connectionRequestDeleted.emit();
            this.router.navigate(['/profiles']);
          },
          error: (error) => {
            console.log('Erreur lors du blocage de l\'utilisateur:', error);
          },
        });
      }
      
}