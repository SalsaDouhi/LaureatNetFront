import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../../../core/services/profile.service';
import { UserProfile } from '../../../shared/interfaces/UserProfile';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  profileForm!: FormGroup;
  userProfile!: UserProfile;
  isOwner: boolean = false;
  error!: string;
  currentUserId: number = 0;
  selectedFiles: { [key: string]: File } = {};

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCurrentUser();
  }

  initForm(): void {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      bio: [''],
      website: [''],
      facebook: [''],
      instagram: [''],
      twitter: [''],
      youtube: [''],
      linkedin: [''],
    });
  }

  getCurrentUser() {
    this.currentUserId = this.authService.getCurrentUserId();
    this.profileService.getUserProfileById(this.currentUserId).subscribe({
      next: (profile) => {
        this.userProfile = profile;
        this.isOwner = this.authService.getCurrentUserId() === profile.userAccountId;
        this.profileForm.patchValue(profile);
      },
      error: (error) => {
        console.log(`Error getting profile info: `, error);
      },
    });
  }

  onFileSelect(event: Event, fileType: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFiles[fileType] = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const formData = new FormData();
      const updatedProfile = { ...this.userProfile, ...this.profileForm.value } as UserProfile;

      // Append form fields
      Object.keys(updatedProfile).forEach(key => {
        formData.append(key, (updatedProfile as any)[key]);
      });

      // Append files
      if (this.selectedFiles['picture']) {
        formData.append('picture', this.selectedFiles['picture']);
      }
      if (this.selectedFiles['banner']) {
        formData.append('banner', this.selectedFiles['banner']);
      }

      this.profileService.updateUserProfile(this.currentUserId, formData).subscribe(
        (response) => {
          console.log('User profile updated successfully:', response);
          console.log('User profile updated successfully:', formData);
           this.router.navigate(['/profiles/'+this.currentUserId]);
          this.profileForm.reset();
          this.getCurrentUser();
          alert('Profile updated successfully');
        },
        (error) => {
          console.error('Error updating user profile:', error);
          this.error = 'Error updating user profile. Please try again later.';
        }
      );
    } else {
      console.error('Error updating user profile:');
      this.profileForm.markAllAsTouched();
    }
  }
}
