import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SubscriptionService } from '../../../core/services/subscriptionData.service';

@Component({
  selector: 'app-unsubscription-btn',
  templateUrl: './unsubscription-btn.component.html',
})
export class UnsubscriptionBtnComponent  {
  @Input() subscriptionId: number = 0;
  @Output() deleteSubscription = new EventEmitter<void>();
  currentUserId: number = 0;

  constructor(
    private messageService: MessageService,
    private subscriptionService: SubscriptionService
  ) {}

  removeSubscription(): void {
    this.subscriptionService.deleteSubscription(this.subscriptionId).subscribe({
      next: () => {
        this.deleteSubscription.emit();
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Abonnement supprimé.',
        });
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de l\'abonnement:', error);
      },
    });
  }
}
