import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../core/services/auth.service';
import { SubscriptionService } from '../../../core/services/subscriptionData.service';

@Component({
  selector: 'app-subscription-btn',
  templateUrl: './subscription-btn.component.html',
})
export class SubscriptionBtnComponent  {
  @Input() subscribedToId: number = 0;
  @Output() subscriptionRequestSent = new EventEmitter<void>();
  currentUserId: number = 0;

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private subscriptionService: SubscriptionService
  ) {}

  subscribe(): void {
    this.currentUserId = this.authService.getCurrentUserId() ?? 0;
    let profileId = this.currentUserId;
    const subscriptionData = {
      subscriberId: profileId,
      subscribedToId: this.subscribedToId,
    };
    this.subscriptionService.createSubscription(subscriptionData)
      .subscribe(
        () => {
          this.subscriptionRequestSent.emit();
          this.messageService.add({severity:'success', summary: 'Succès', detail: 'Vous êtes abonné à cet utilisateur !'});
        },
        () => {
          this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Échec de la demande d\'abonnement !'});
        }
      );
  }
}
