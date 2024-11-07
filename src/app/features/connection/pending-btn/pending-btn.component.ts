import { Component, OnInit, Input, EventEmitter, Output} from "@angular/core";
import { Connection } from "../../../shared/interfaces/Connection";
import { ConfirmationDialogService } from "../../../core/services/confirmation-dialog.service";
import { ConnectionService } from "../../../core/services/connectionData.service";

@Component({
  selector: 'app-pending-btn',
  templateUrl: './pending-btn.component.html',
})

export class PendingBtnComponent implements OnInit {
  @Input() connectionId: number = 0;
  @Output() connectionRequestDeleted = new EventEmitter<void>();

  connections: Connection[] = [];

  constructor(
    private connectionService: ConnectionService,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void { }

  cancelConnection(): void {    
    this.openConfirmationDialog(this.connectionId);
  }

  openConfirmationDialog(connectionId: number) {
    this.confirmationDialogService.confirm('Êtes-vous sûr ?', 'Voulez-vous vraiment retirer l\'invitation ?', 'Retirer')
      .then((confirmed) => {
        if (confirmed) {
          console.log('L\'utilisateur a confirmé la boîte de dialogue');
          this.deleteConnection(connectionId); 
        } else {
          console.log('L\'utilisateur a rejeté la boîte de dialogue');
        }
      })
      .catch(() => console.log('L\'utilisateur a rejeté la boîte de dialogue (par exemple, en utilisant ESC, en cliquant sur l\'icône de croix ou en cliquant à l\'extérieur de la boîte de dialogue)'));
  }
  
  

  deleteConnection(id: number): void {
    this.connectionService.deleteConnection(id)
      .subscribe(() => {
        this.connections = this.connections.filter(connection => connection.id !== id);
        this.connectionRequestDeleted.emit();
      });
  }
}