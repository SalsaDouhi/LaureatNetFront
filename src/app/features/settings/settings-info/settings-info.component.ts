import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ProfileService } from '../../../core/services/profile.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-settings-info',
  templateUrl: './settings-info.component.html',
  styleUrl: './settings-info.component.css',
})
export class SettingsInfoComponent implements OnInit {
  profileForm!: FormGroup;
  currentUserId: number = 0;

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      location: ['', Validators.required],
    });

    this.currentUserId = this.authService.getCurrentUserId();

    // populating fields
    this.profileService
      .getUserProfileByUserAccountId(this.currentUserId)
      .subscribe((userProfile) => {
        this.profileForm.patchValue(userProfile);
      });
  }

  submit() {
    if (this.profileForm.valid) {
      this.profileService
        .updateUserPersonalInfo(this.currentUserId, this.profileForm.value)
        .subscribe(
          (response) => {
            this.messageService.add({severity:'success', summary: 'Succès', detail: 'modification avec succes !'});
            // console.log('les info ', this.profileForm.value);
            // console.log('User information updated successfully', response);
            // this.router.navigate(['/profiles/' + this.currentUserId]);
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
