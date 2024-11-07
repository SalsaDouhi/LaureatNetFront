import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../core/services/profile.service';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings-socialmedia',
  templateUrl: './settings-socialmedia.component.html',
  styleUrl: './settings-socialmedia.component.css',
})
export class SettingsSocialmediaComponent implements OnInit {
  networkingForm!: FormGroup;
  currentUserId: number = 0;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.networkingForm = this.fb.group({
      website: [''],
      facebook: [''],
      instagram: [''],
      twitter: [''],
      youtube: [''],
      linkedin: [''],
    });

    this.currentUserId = this.authService.getCurrentUserId();

    // populating fields
    this.profileService
      .getUserProfileByUserAccountId(this.currentUserId)
      .subscribe((userProfile) => {
        this.networkingForm.patchValue(userProfile);
      });
  }

  submit(): void {
    if (this.networkingForm.valid) {
      this.profileService
        .updateUserNetworking(
          this.currentUserId,
          this.networkingForm.value
        )
        .subscribe(
          (response) => {
            // console.log('les info ', this.networkingForm.value);
            // console.log('User information updated successfully', response);
            // this.router.navigate(['/profiles/'+this.currentUserId]);
            // TODO show confirm toast
          },
          (error) => {
            // TODO show error toast
            console.error('Error updating user information', error);
          }
        );
    }
  }
}
