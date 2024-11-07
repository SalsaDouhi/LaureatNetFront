import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../../core/services/profile.service';
import { Profile } from '../../../shared/interfaces/Profile';
import { UserProfile } from '../../../shared/interfaces/UserProfile';
import { MatDialog } from '@angular/material/dialog';
import { SectionModalComponent } from '../section-modal/section-modal.component';
import { Connection } from '../../../shared/interfaces/Connection';
import { MessageService } from 'primeng/api';
import { ConnectionService } from '../../../core/services/connectionData.service';
import { SubscriptionService } from '../../../core/services/subscriptionData.service';
import { Subscription } from '../../../shared/interfaces/Subscription';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css',
})
export class ProfilePageComponent implements OnInit {
  profile: Profile = { userProfile: {} as UserProfile } as Profile;
  acceptedConnections: Connection[] = [];
  connections: Connection[] = [];
  subscriptions: Subscription[] = [];
  currentUserId: number = 0;
  connected: string = 'noConnection';
  subscribed: string = 'noSubscription';
  connectionId: number = 0;
  subscriptionId: number = 0;
  currentUserId2: string = '';
  inputValue = '';
  showBioEdit: boolean = false;
  myBioContent: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private profileService: ProfileService,
    private connectionService: ConnectionService,
    public dialog: MatDialog,
    private messageService: MessageService,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.route.params.subscribe((params) => {
      this.currentUserId = this.authService.getCurrentUserId() ?? 0;
      let profileId = this.currentUserId;
      if (params['id']) profileId = +params['id'];

      this.profileService.getProfile(profileId.toString()).subscribe({
        next: (profile) => {
          this.profile = profile;
          this.fetchAcceptedConnections();
          this.fetchAllConnections();
          this.fetchSubscriptions();
          // if (!this.profile.posts) this.profile.posts = [];
          // if (!this.profile.comments) this.profile.comments = [];
        },
        error: (error) => {
          console.log('Error getting profile info:', error);
        },
      });
    });
  }

  fetchAcceptedConnections(): void {
    this.route.params.subscribe((params) => {
      this.currentUserId = this.authService.getCurrentUserId() ?? 0;
      let profileId = this.currentUserId;
      if (params['id']) profileId = +params['id'];
      this.connectionService.getAcceptedConnections(profileId).subscribe({
        next: (connections) => {
          this.acceptedConnections = connections;
        },
        error: (error) => {
          if (error.status === 404) {
            this.acceptedConnections = [];
            console.error('No connections found.');
          } else {
            console.error('Error getting connections:', error);
          }
        },
      });
    });
  }

  fetchAllConnections(): void {
    this.route.params.subscribe((params) => {
      this.currentUserId = this.authService.getCurrentUserId() ?? 0;
      let profileId = this.currentUserId;
      if (params['id']) profileId = +params['id'];
      this.connectionService.getAllConnectionsById(profileId).subscribe({
        next: (connections) => {
          this.connections = connections;
          this.checkConnection();
        },
        error: (error) => {
          if (error.status === 404) {
            this.connections = [];
            this.connected = 'noConnection';
            console.error('No connections found.');
          } else {
            console.error('Error getting connections:', error);
          }
        },
      });
    });
  }

  fetchSubscriptions(): void {
    this.route.params.subscribe((params) => {
      this.currentUserId = this.authService.getCurrentUserId() ?? 0;
      let profileId = this.currentUserId;
      if (params['id']) profileId = +params['id'];
      this.subscriptionService
        .getSubscribedToListByUserId(profileId)
        .subscribe((subscriptions) => {
          // console.log('subscriptions:', subscriptions);
          this.subscriptions = subscriptions;
          this.checkSubscription();
        });
    });
  }

  getAcceptedConnections() {
    if (!this.acceptedConnections || !this.acceptedConnections.length) return 0;
    return this.acceptedConnections.length;
  }

  getSubscriptions() {
    if (!this.subscriptions || !this.subscriptions.length) return 0;
    return this.subscriptions.length;
  }

  checkConnection(): void {
    if (
      !this.currentUserId ||
      !this.profile.userId ||
      !this.connections ||
      this.connections.length == 0
    )
      return;
    const userId = this.profile.userId;
    // const areConnected = this.connections.find((connection: Connection) => {
    //   const condition1 =
    //     connection.userConnectWithId == userId &&
    //     connection.userConnectedId == this.currentUserId;
    //   const condition2 =
    //     connection.userConnectWithId == this.currentUserId &&
    //     connection.userConnectedId == userId;
    //   return condition1 || condition2;
    // });

    // if (areConnected) {
    //   if (connection.accepted) {
    //     this.connected = 'connected';
    //     this.connectionId = connection.id;
    //   } else {
    //     this.connected = 'pending';
    //     this.connectionId = connection.id;
    //   }
    // } else {
    //   console.error(
    //     `No connection exists between ${this.currentUserId} and ${userId}`
    //   );
    //   this.connected = 'noConnection';
    // }

    for (const connection of this.connections) {
      if (
        (connection.userConnectWithId == userId &&
          connection.userConnectedId == this.currentUserId) ||
        (connection.userConnectWithId == this.currentUserId &&
          connection.userConnectedId == userId)
      ) {
        if (connection.accepted) {
          this.connected = 'connected';
          this.connectionId = connection.id;
        } else {
          this.connected = 'pending';
          this.connectionId = connection.id;
        }
      }
    }
  }

  checkSubscription(): void {
    if (!this.currentUserId || !this.profile.userId) return;
    if (!this.subscriptions || !this.subscriptions.length) {
      this.subscribed = 'noSubscription';
      return;
    }
    const userId = this.profile.userId;
    // console.log('currentUserId:', this.currentUserId);
    // console.log('userId:', userId);

    const subscription = this.subscriptions.find(
      (subscription: Subscription) => {
        const condition1 =
          subscription.subscriberId == userId &&
          subscription.subscribedToId == this.currentUserId;
        const condition2 =
          subscription.subscriberId == this.currentUserId &&
          subscription.subscribedToId == userId;
        return condition1 || condition2;
      }
    );
    console.log('subscription:', subscription);

    if (subscription) {
      this.subscribed = 'subscribed';
      this.subscriptionId = subscription.id;
    } else {
      console.error(
        `No subscription exists between ${this.currentUserId} and ${userId}`
      );
      this.subscribed = 'noSubscription';
    }
  }

  removeSubscription(): void {
    this.subscribed = 'noSubscription';
  }

  removeConnection(): void {
    this.connectionService.deleteConnection(this.connectionId).subscribe({
      next: () => {
        console.log(
          'connection id ' + this.connectionId + ' supprimée avec succès'
        );

        this.connectionId = 0;
        this.connected = 'noConnection';
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Connexion supprimée avec succès.',
        });
      },
      error: (error) => {
        console.error('Erreur lors de la suppression de la connexion:', error);
      },
    });
  }

  sendConnectionRequest(): void {
    this.fetchAllConnections();
  }

  subscribe(): void {
    this.fetchSubscriptions();
  }

  blockUser(): void {
    this.removeConnection();
  }

  openSectionsModal() {
    const dialogRef = this.dialog.open(SectionModalComponent, {
      width: '70%',
      height: '60%',
      data: {
        sections: this.profile.sections,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.profileService.getProfile(this.profile.userId.toString()).subscribe({
        next: (profile) => {
          this.profile.sections = profile.sections;
          // console.log(`profile updated: `, this.profile);
        },
        error: (error) => {
          console.log(`Error getting profile info: `, error);
        },
      });
    });
  }

  anyLink() {
    if (
      this.profile.userProfile.website ||
      this.profile.userProfile.facebook ||
      this.profile.userProfile.instagram ||
      this.profile.userProfile.twitter ||
      this.profile.userProfile.youtube ||
      this.profile.userProfile.linkedin
    ) {
      return true;
    }

    return false;
  }

  toggleBioEdit(value: boolean) {
    this.showBioEdit = value;
    if (this.showBioEdit)
      this.myBioContent = this.profile.userProfile.bio.toString();
  }

  saveBio(input: HTMLTextAreaElement) {
    let formatedBio = input.value.trim();
    if (formatedBio == '') return;
    this.profileService.updateUserBio(formatedBio).subscribe({
      next: (bio) => {},
      error: (error) => {
        console.log(`Error updating user bio: `, error);
      },
    });
    this.showBioEdit = false;
    this.profile.userProfile.bio = formatedBio;
  }

  getPicture() {
    if (
      !this.profile.userProfile.picture ||
      this.profile.userProfile.picture == ''
    )
      return 'assets/images/no_pfp.png';

    return (
      'http://localhost:8080/api/v1/files/' + this.profile.userProfile.picture
    );
  }

  getBanner() {
    if (
      !this.profile.userProfile.banner ||
      this.profile.userProfile.banner == ''
    )
      return 'assets/images/no_banner.jpg';

    return (
      'http://localhost:8080/api/v1/files/' + this.profile.userProfile.banner
    );
  }

  redirectTo(url: String): void {
    window.open(url.toString(), '_blank');
  }
  redirectToPostCreate() {}
}
