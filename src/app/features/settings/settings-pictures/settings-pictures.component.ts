import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProfileService } from '../../../core/services/profile.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-settings-pictures',
  templateUrl: './settings-pictures.component.html',
  styleUrl: './settings-pictures.component.css',
})
export class SettingsPicturesComponent implements OnInit {
  FilesForm: FormGroup;

  currentProfilePictureUrl: string = '';
  currentBannerUrl: string = '';

  currentUserId: number = 0;

  profilePictureFile: File | null = null;
  bannerFile: File | null = null;

  picturePreview: string | ArrayBuffer | null = '';
  bannerPreview: string | ArrayBuffer | null = '';

  constructor(
    private authService: AuthService,
    public profileService: ProfileService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
  ) {
    this.FilesForm = this.fb.group({
      profilePicture: [null],
      banner: [null],
    });
  }

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUserId();

    this.profileService
      .getUserProfileById(this.currentUserId)
      .subscribe((userInfo) => {
        this.FilesForm.patchValue(userInfo);

        this.currentProfilePictureUrl = userInfo.picture;
        this.currentBannerUrl = userInfo.banner;
      });
  }

  onFileChange(event: Event, type: string) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (type == 'profilePicture') {
        this.profilePictureFile = file;
        this.picturePreview = reader.result;
      } else if (type == 'banner') {
        this.bannerFile = file;
        this.bannerPreview = reader.result;
      }
    };
    reader.readAsDataURL(file);

    // if (type === 'profilePicture') {
    //   const reader = new FileReader();
    //   reader.onload = (e) => (this.picturePreview = reader.result?.toString()!);
    //   reader.readAsDataURL(file);
    //   console.log(this.picturePreview);
    // } else if (type === 'banner') {
    // }
  }

  sumbit() {
    const formData = new FormData();
    if (this.profilePictureFile) {
      formData.append('picture', this.profilePictureFile);
    }
    if (this.bannerFile) {
      formData.append('banner', this.bannerFile);
    }
    console.log('User information updated successfully', formData);
    this.profileService
      .updateUserPictures(this.currentUserId, formData)
      .subscribe(
        (response) => {
          this.messageService.add({severity:'success', summary: 'Succès', detail: 'modification avec succes !'});
          console.log('User information updated successfully', response);
          this.profileService.fetchCurrentUserDetails();
          // this.router.navigate(['/profiles/' + this.currentUserId]);
        },
        (error) => {
          console.error('Error updating user information', error);
        }
      );
  }
}
