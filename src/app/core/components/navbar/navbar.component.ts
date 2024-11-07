import { Component, ElementRef, EventEmitter, HostListener, OnInit } from '@angular/core';
import { ToggleService } from '../../services/toggle.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../../shared/interfaces/Profile';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  showSearchPopup: boolean = false;
  searchTerm: string = '';
  filteredUsers: Profile[] = [];
  recentSearches: string[] = [];
  currentUserId: number = 0;
  role: string = 'user';
  activeModal: string | null;
  constructor(
    private toggleService: ToggleService,
    private eRef: ElementRef,
    private authService: AuthService,
    public profileService: ProfileService,
    private router: Router,
    private messageService: MessageService
  ) {    
    this.activeModal = null;
  }
  showOfferPost: boolean = false;
  showScientificArticlePost: boolean = false;




  openModal(modalType: string, event: any): void {
    event.preventDefault();
    this.activeModal = modalType;
  }
  closeModal(): void {
    this.activeModal = null;
  }
  submitPost():void{
    this.activeModal = null;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Publication Crée avec succès!',
      life:1000,
    });
  }
  ngOnInit() {
    const currentUserRoles = this.authService.getCurrentUserRoles();
    if (currentUserRoles && currentUserRoles.includes('ROLE_DOC')) {
      this.showScientificArticlePost = true;
      this.showOfferPost = true;
    }else if (currentUserRoles && currentUserRoles.includes('ROLE_LAUREAT')) {
      this.showScientificArticlePost = false;
      this.showOfferPost = true;
    }
    const storedSearches = localStorage.getItem('recentSearches');
    if (storedSearches) {
      this.recentSearches = JSON.parse(storedSearches);
    }
    if (currentUserRoles && currentUserRoles.includes('ROLE_ADMIN')) {
      this.role = 'admin';
    }
  }

  onSearchTermChange(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    this.filterUsers();
  }

  filterUsers() {
    this.currentUserId = this.authService.getCurrentUserId() ?? 0;
    let profileId = this.currentUserId;
    const formatedSearchTerm = this.searchTerm.toLowerCase().trim();
    this.filteredUsers = [];
    if (formatedSearchTerm == '') return;

    if (this.searchTerm) {
      this.profileService
        .getAllProfiles(profileId)
        .pipe(
          map((profiles: Profile[]) =>
            profiles.filter((user) => {
              return (
                user.userProfile.firstName
                  .toLowerCase()
                  .trim()
                  .startsWith(formatedSearchTerm) ||
                user.userProfile.lastName
                  .toLowerCase()
                  .trim()
                  .startsWith(formatedSearchTerm)
              );
            })
          ),
          catchError((error) => {
            console.log('Error occurred while filtering profiles:', error);
            return [];
          })
        )
        .subscribe((filteredProfiles) => {
          this.filteredUsers = filteredProfiles;
        });
    } else {
      this.filteredUsers = [];
    }
  }

  addUserToRecentSearches(user: Profile) {
    const fullName = `${user.userProfile.firstName} ${user.userProfile.lastName}`;
    if (!this.recentSearches.includes(fullName)) {
      this.recentSearches.push(fullName);
      localStorage.setItem(
        'recentSearches',
        JSON.stringify(this.recentSearches)
      );
    }
  }

  onRecentSearchClick(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.filterUsers();
  }

  onUserClick(user: Profile) {
    this.router.navigate(['/profiles/' + user.userId]);
    this.addUserToRecentSearches(user);
    this.toggleSearchPopup();
  }

  clearRecentSearches() {
    this.recentSearches = [];
    localStorage.removeItem('recentSearches');
  }

  doLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleSidebar() {
    this.toggleService.toggleSidebar();
  }

  toggleSearchPopup() {
    this.showSearchPopup = !this.showSearchPopup;
  }

  showSearchPopupFunction() {
    this.showSearchPopup = true;
  }

  closeSearchPopup() {
    // if (this.showSearchPopup) this.showSearchPopup = !this.showSearchPopup;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: { target: any }) {
    if (
      !this.eRef.nativeElement.contains(event.target) &&
      this.showSearchPopup
    ) {
      this.showSearchPopup = false;
    }
  }

  getFullname() {
    return this.profileService.getCurrentUserFullName();
  }

  redirectToProfile() {
    let id = this.profileService.getCurrentUserId();
    this.router.navigate(['/profiles/' + id]);
  }

  redirectToSettings() {
    this.router.navigate(['/settings']);
  }

  getRantomNotifNumber() {
    const min = 5;
    const max = 10;
    return 6;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getProfilePicture(picture: string) {
    if (picture && picture != '')
      return 'http://localhost:8080/api/v1/files/' + picture;
    return 'assets/images/no_pfp.png';
  }

  isAdmin() {
    const currentUserRoles = this.authService.getCurrentUserRoles();
    if (currentUserRoles && currentUserRoles.includes('ROLE_ADMIN')) {
      return true;
    }
    return false;
  }
}
