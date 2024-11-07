import { Component, OnInit } from '@angular/core';
import { Subscription } from '../../../shared/interfaces/Subscription';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SubscriptionService } from '../../../core/services/subscriptionData.service';

@Component({
    selector: 'app-subscription-list',
    templateUrl: './subscription-list.component.html',
    styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent implements OnInit {
    subscriptions: Subscription[] = [];
    filteredSubscriptions: Subscription[] = [];
    searchTerm: string = '';
    currentUserId: number = 0;
    currentView: 'subscribers' | 'subscribedTo' = 'subscribers';
    isLoading: boolean = true;
    noSubscriptionFoundError: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private subscriptionService: SubscriptionService,
        private authService: AuthService,
        private messageService: MessageService,
    ) { }

    ngOnInit(): void {
        this.loadSubscriptions();
    }

    loadSubscriptions(): void {
        this.isLoading = true;
        if (this.currentView === 'subscribers') {
            this.getSubscriptions();
        } else {
            this.getSubscribedToList();
        }
    }

    getSubscriptions(): void {
        this.route.params.subscribe((params) => {
            this.currentUserId = this.authService.getCurrentUserId() ?? 0;
            let profileId = this.currentUserId;
            if (params['id']) profileId = +params['id'];
            this.subscriptionService.getSubscribedToListByUserId(profileId)
                .subscribe(
                    subscriptions => {
                        this.subscriptions = subscriptions;
                        this.filteredSubscriptions = subscriptions;
                        this.isLoading = false; // Set loading to false when connections are loaded
                        console.log("connections received", this.subscriptions);
                    },
                    error => {
                        this.isLoading = false; // Set loading to false on error too
                        if (error.status === 404) {
                            console.error('Aucune invitation trouvée.');
                            this.filteredSubscriptions = [];
                            this.noSubscriptionFoundError = true;
                        } else {
                            console.error('Erreur lors de la récupération des invitations:', error);
                        }
                    }
                );

        });
    }

    getSubscribedToList(): void {
        this.route.params.subscribe((params) => {
            this.currentUserId = this.authService.getCurrentUserId() ?? 0;
            let profileId = this.currentUserId;
            if (params['id']) profileId = +params['id'];
            this.subscriptionService.getSubscriptionsByUserId(profileId)
                .subscribe(
                    subscriptions => {
                        this.subscriptions = subscriptions;
                        this.filteredSubscriptions = subscriptions;
                        this.isLoading = false;
                        console.log("connections received", this.subscriptions);
                    },
                    error => {
                        this.isLoading = false; // Set loading to false on error too
                        if (error.status === 404) {
                            console.error('Aucune invitation trouvée.');
                            this.filteredSubscriptions = [];
                            this.noSubscriptionFoundError = true;
                        } else {
                            console.error('Erreur lors de la récupération des invitations:', error);
                        }
                    }
                );
        });
    }


    deleteSubscription(id: number): void {
        console.log('delete Subscription', id);
        this.subscriptionService.deleteSubscription(id)
            .subscribe(() => {
                this.subscriptions = this.subscriptions.filter(subscription => subscription.id !== id);
                this.filteredSubscriptions = this.filteredSubscriptions.filter(subscription => subscription.id !== id);
                if (this.currentView === 'subscribers')
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Désabonnement réussi !',
                        detail: 'Vous vous êtes désabonné(e) de cet utilisateur.',
                    });
                else {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Désabonnement réussi !',
                        detail: 'Vous avez désabonné cet utilisateur.',
                    });
                }
            });
    }

    searchSubscriptions(): void {
        if (this.searchTerm.trim() === '') {
            this.filteredSubscriptions = this.subscriptions;
            return;
        }

        this.filteredSubscriptions = this.subscriptions.filter(subscription => {
            return subscription.fullname.toLowerCase().includes(this.searchTerm.toLowerCase());
        });
    }

    switchToReceived(): void {
        this.currentView = 'subscribers';
        this.noSubscriptionFoundError = false;
        this.loadSubscriptions();
    }

    switchToSent(): void {
        this.currentView = 'subscribedTo';
        this.noSubscriptionFoundError = false;
        this.loadSubscriptions();
    }

    getProfilePicture(picture: string) {
        if (picture && picture != '')
          return 'http://localhost:8080/api/v1/files/' + picture;
        return 'assets/images/no_pfp.png';
    }
}
